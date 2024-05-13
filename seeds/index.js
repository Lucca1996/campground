
const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database Connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '65fbaffe40d6004fb5123c66',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dncvxpgj1/image/upload/v1711029748/YelpCamp/al0vxxqwyh6s75kbe75u.jpg',
                    filename: 'YelpCamp/al0vxxqwyh6s75kbe75u',
                },
                {
                    url: 'https://res.cloudinary.com/dncvxpgj1/image/upload/v1711029748/YelpCamp/hpkj12i6txmv3pfe5lkp.jpg',
                    filename: 'YelpCamp/hpkj12i6txmv3pfe5lkp',
                }
            ]
        })
        await camp.save();
    }
}

seedDb().then(() => {
    db.close()
});