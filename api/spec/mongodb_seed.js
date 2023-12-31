const User = require('../models/user');
const mongoose = require('mongoose');
const { faker } =  require('@faker-js/faker');
const Post = require('../models/post');

const seedDB = async () => {

    await mongoose.connect('mongodb://localhost:27017/acebook_seed', {
        useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error(err));

    await User.deleteMany({})
        .then(() => console.log('Deleted all users'))
        .catch(err => console.error(err));
        
    await Post.deleteMany({})
        .then(() => console.log('Deleted all posts'))
        .catch(err => console.error(err));

    const baseUsers = [{
        firstName: 'Kumaili',
        lastName: 'Ciddi',
        username: 'JohnDough',
        password: 'password',
        email: 'hero@hungry.com',
        signupTimeAndDate: new Date().toLocaleString(),
        profilePic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        friends: [],
    },
    {
        firstName: 'Chalet',
        lastName: 'Hunch',
        username: 'SourestDough',
        password: 'password',
        email: 'dour@deli.com',
        signupTimeAndDate: new Date().toLocaleString(),
        profilePic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        friends: [],
    },
    {
        firstName: 'Mortimer',
        lastName: 'Rye',
        username: 'Morty',
        password: 'password',
        email: 'test@acebook.com',
        signupTimeAndDate: new Date().toLocaleString(),
        profilePic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        friends: [],
    },
    {
        firstName: 'Tess',
        lastName: 'Test',
        username: 'Test',
        password: 'test',
        email: 'test.test@test.com',
        signupTimeAndDate: new Date().toLocaleString(),
        profilePic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        friends: [],
    },
    {
        firstName: 'Fake',
        lastName: 'Fake',
        username: 'Fake',
        password: 'fake',
        email: 'fake.fake@fake.com',
        signupTimeAndDate: new Date().toLocaleString(),
        profilePic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        friends: [],
    }];



    const generateUsers = (num) => {
        const user = [];
  
        for (let i = 0; i < num; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const username = faker.internet.userName();
        const password = faker.internet.password();
        const email = faker.internet.email();
        const signupTimeAndDate = faker.date.past();
        const profilePic = faker.image.avatar();
        const photoCollection = [];
        const friends = [];
        for (let i = 0; i < 10; i++) {
            photoCollection.push(faker.image.urlPicsumPhotos());
        }

        user.push({
            firstName,
            lastName,
            username,
            password,
            email,
            signupTimeAndDate,
            profilePic,
            photoCollection,
            friends,
        });
        }
    
        return user;
    }

    const generatePosts = (num) => {
        const post = [];
  
        for (let i = 0; i < num; i++) {
        const message = faker.lorem.sentence();
        const postTimeAndDate = faker.date.past();
        const likes = faker.number.int({max: 500, min: 1});
        const comments = [faker.lorem.sentence(), faker.lorem.sentence(), faker.lorem.sentence()]
    
        post.push({
            message,
            postTimeAndDate,
            likes,
            comments,
        });
        }
    
        return post;
    }

    const post = generatePosts(50);
    const user = generateUsers(50);

    Post.insertMany(post)
    .then(docs => console.log(`${docs.length} posts have been inserted into the database.`))
    .catch(err => {
        console.error(err);
        console.error(`${err.writeErrors?.length ?? 0} errors occurred during the insertMany operation.`);
    });

    User.insertMany(baseUsers)
    .then(docs => console.log(`Base users have been inserted into the database.`))
    .catch(err => {
        console.error(err);
        console.error(`${err.writeErrors?.length ?? 0} errors occurred during the insertMany operation.`);
    });

    User.insertMany(user)
    .then(docs => console.log(`${docs.length} users have been inserted into the database.`))
    .then(() => mongoose.connection.close())
    .catch(err => {
        console.error(err);
        console.error(`${err.writeErrors?.length ?? 0} errors occurred during the insertMany operation.`);
    });

}
seedDB();
