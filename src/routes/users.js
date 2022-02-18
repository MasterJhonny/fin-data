const express = require('express');

const router = express.Router();

const { ModelUser } = require('../database/database');

router.get('/add', (req, res) => {
    res.render('users/add');
});

router.post('/add', async (req, res) => {
    const { last_name, last_name_mother, names, ci, re_uni, cel } = req.body;

    if(!last_name || !last_name_mother || !names || !ci || !re_uni || !cel){
        throw new Error('Ups sucedio un error, faltan datos');
        return 0;
    }

    const data = {
        last_name, last_name_mother, names, ci, re_uni, cel
    }

    try {
        
        const newUser = new ModelUser(data);
        const rta = await newUser.save();

        res.render('users/thanks', { user: rta });
    } catch (error) {
        console.error(error);
    }
});

router.get('/thanks', (req, res) => {
    res.render('users/thanks');
})

router.get('/', async (req, res) => {




    try {
        const users = await ModelUser.find();
        if(!users){
            throw boom.notFound('Ups, not found');
        }
        res.render('users/list', { users });
    } catch (error) {
        console.error(error);
    }

});

router.get('/view/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await ModelUser.findById(id);
        if(!user){
            throw boom.notFound('Ups, not found');
        }

        res.render('users/view', { user });
    } catch (error) {
        console.error(error);
    }
})

router.get('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleteUser = await ModelUser.findByIdAndDelete(id);
        if(!deleteUser){
            throw boom.notFound('Not found');
        }
        res.redirect('/users');
    } catch (error) {
        console.error(error);
    }
});

router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    
    const user = await ModelUser.findById(id);
    if(!user){
      throw boom.notFound('Ups, not found');
    }
    res.render('users/edit', { user });
});

router.post('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { last_name, last_name_mother, names, ci, re_uni, cel } = req.body;
        // validator 
        if(!last_name || !last_name_mother || !names || !ci || !re_uni || !cel){
            throw new Error('Ups sucedio un error, faltan datos');
            return 0;
        }
        // update user
        const updateUser = {
            last_name, last_name_mother, names, ci, re_uni, cel
        }
        
        const user = await ModelUser.findByIdAndUpdate(id, updateUser);
        if(!user) {
            throw boom.notFound('Ups, not found');
        }
        res.render('users/update', { ... updateUser, id });
    } catch (error) {
        console.error(error);
    }
});


module.exports = router;