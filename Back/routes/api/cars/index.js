const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../../auth');
const User = mongoose.model('User');
const Car = mongoose.model('Car');


///// a securiser mais fonctionelle
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

///// Peut etre securiser a voir
router.get('/getUserCars', auth.optional, (req, res, next) => {
    const { id } = req.query
    User.findById(id).populate('cars').exec((err, user) => {
        if (err) {
            return res.json(err)
        }else {
            return res.json(user.cars)
        }
    })
})

//////Fonctionelle a securiser
router.get('/deleteCar', auth.required, (req, res, next) => {
    const { carId } = req.query
    const { payload: { id } } = req;

    Car.findById(carId, function( err, car ){
        car.remove(function(err){
            if (!err) {
                User.findByIdAndUpdate(id, { $pull: {cars: carId } }, {safe: true, upsert: true}, function( err, user ){
                    if (err) {
                        return res.json(err)
                    }else {
                        return res.status(200).json({
                            deleted: true,
                            message: 'Car deleted'
                        })
                    }
                })
            }
        })
    })
})


module.exports = router;
