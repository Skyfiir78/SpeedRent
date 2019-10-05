const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../../auth');
const User = mongoose.model('User');
const Car = mongoose.model('Car');

router.post('/add', auth.required, (req, res, next) => {
    const { body: { car } } = req;
    const { payload: { id } } = req;
    User.findById(id, function( err, user ){
        if (err) return err

        if (user) {
            const newCar = new Car({
                marque: car.marque,
                model: car.model,
                immat: car.immat,
                renter: user._id
            })

            user.cars.push(newCar)

            user.save().then(() => {
                newCar.save().then(() => res.json({
                    saved: true,
                    car: newCar,
                }))
            })
        }
    })
})

router.get('/getUserCars', auth.optional, (req, res, next) => {
    const { id } = req.query
    User.findById(id).populate('cars').exec((err, user) => {
        if (err) {
            console.log(err);
        }else {
            return res.json(user.cars)
        }
    })
})

//////Non fonctionelle a travailler
router.get('/popUserCar', auth.required, (req, res, next) => {
    const { carId } = req.query
    const { payload: { id } } = req;
    console.log('userId', id);
    console.log('carId', carId);
    Car.findById(carId, function( err, car ){
        User.findByIdAndUpdate(id, { $pull: {car: car } }, {safe: true, upsert: true}, function( err, user ){
            if (err) {
                console.log(err);
            }else {
                console.log(user);
            }
        })
    })
})


module.exports = router;
