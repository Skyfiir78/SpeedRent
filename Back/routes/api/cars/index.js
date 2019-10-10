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
                renter: user._id,
                available: false
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

///// Peut etre a securiser a voir
router.get('/getUserWithCars', auth.optional, (req, res, next) => {
    const { id } = req.query

    if (!id)
        return res.json({errors: 'id du vehicule manquant'})

    User.findById(id).populate('cars').exec((err, user) => {
        if (err) {
            return res.json({
                errors: 'idUser non valide'
            })
        }else {
            return res.json(user)
        }
    })
})

//////Fonctionelle a securiser
router.get('/deleteCar', auth.required, (req, res, next) => {
    const { payload: { id } } = req;
    const { carId } = req.query

    if (!carId)
        return res.json({errors: 'carId manquant'})

    Car.findById(carId, function( err, car ){
        ///Si le vehicule existe je le supprime
        car.remove(function(err){
            if (!err) {
                //// Je recupere user en suprimant dans le tableau cars l'id du vehicule
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
