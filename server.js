'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('cabinetdb', 'irinateal', '');
const cors = require('cors');

let app = express()
app.use(express.static(__dirname + '/app'))
app.use(bodyParser.json())
app.use(cors())

let Doctor = sequelize.define('doctor', {
    name: {
        allowNull: false,
        type: Sequelize.STRING
        
    },
    description: {
        allowNull:false,
        type: Sequelize.STRING
    }
})

let Pacient = sequelize.define('pacient', {
    pnume: {
        allowNull: false,
        type: Sequelize.STRING
    },
    info: {
        allowNull: false,
        type: Sequelize.STRING
        
    },
    programari: {
        allowNull: false,
        type: Sequelize.STRING
        
    },
    
})
Doctor.hasMany(Pacient, {
    foreignKey: 'doctorId'
})

Pacient.belongsTo(Doctor, {
    foreignKey: 'doctorId'
})

app.get('/create', (req, res) => {
    sequelize
        .sync({
            force: true
        })
        .then(() => {
            res.status(201).send('creat')
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('eroare')
        })
})

app.get('/doctors', (req, res) => {
    Doctor
        .findAll({
            attributes: ['id', 'name', 'description']
        })
        .then((doctors) => {
            res.status(200).send(doctors)
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('eroare')
        })
})
app.post('/doctors', (req, res) => {
    Doctor
        .create(req.body)
        .then(() => {
            res.status(201).send('creat')
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('eroare')
        })
})

app.get('/doctors/:idDoc', (req, res) => {
    Doctor
        .find({
            attributs: ['id', 'name', 'description'],
            where: {
                id: req.params.id
            }
        })
        .then((doctor) => {
            res.status(200).send(doctor)
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('eroare')
        })
})
app.delete('/doctors/:idDoc', (req, res) => {
    Doctor
        .find({
            where: {
                id: req.params.id
            }
        })
        .then((doctor) => {
            return doctor.destroy()
        })
        .then(() => {
            res.status(201).send('sters')
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('eroare')
        })
})
app.put('/doctors/:idDoc', (req, res) => {
    Doctor
        .find({
            where: {
                id: req.params.id
            }
        })
        .then((doctor) => {
            return doctor.updateAttributes(req.body)
        })
        .then(() => {
            res.status(201).send('modificat')
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('eroare')
        })
})
app.get('/doctors/:idDoc/pacients', (req, res) => {
    Doctor
        .find({
            where: {
                id: req.params.id
            },
            include: [Pacient]
        })
        .then((doctor) => {
            return doctor.getPacients()
        })
        .then((pacients) => {
            res.status(200).send(pacients)
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('eroare')
        })
})
app.get('/doctors/:idDoc/pacients/:idP', (req, res) => {
    Pacient
        .find({
            attributes: ['id', 'pnume', 'info', 'programari'],
            where: {
                id: req.params.id
                
            }
        })
        .then((pacient) => {
            res.status(200).send(pacient)
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('eroare')
        })
})
app.post('/doctors/:id/pacients', (req, res) => {
    Doctor
        .find({
            where: {
                id: req.params.id
            }
        })
        .then((doctor) => {
            let pacient = req.body
            pacient.doctorId = doctor.id
            return Pacient.create(pacient)
        })
        .then(() => {
            res.status(201).send('creat')
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('eroare')
        })
})

app.put('/doctors/:id/pacients/:idP', (req, res) => {
    Pacient
        .find({
            where: {
                id: req.params.id
            }
        })
        .then((pacient) => {
            pacient.pnume = req.body.pnume
            pacient.info = req.body.info
            pacient.programari = req.body.programari
            return pacient.save()
        })
        .then(() => {
            res.status(201).send('modificat')
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('eroare')
        })
})

app.delete('/doctors/:id/pacients/:idP', (req, res) => {
    Pacient
        .find({
            where: {
                id: req.params.id
            }
        })
        .then((pacient) => {
            return pacient.destroy()
        })
        .then(() => {
            res.status(201).send('sters')
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('eroare')
        })
})
app.get('/pacients', (req, res) => {
    Pacient
        .findAll({
            attributes: ['id', 'pnume', 'info', 'programari']
            })
        .then((pacients) => {
            res.status(200).send(pacients)
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('eroare')
        })
})

app.listen(8080)