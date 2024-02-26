const { Tag } = require('../models');

//create some dummy tag data

const tagData = [
  {
    tag_name: 'rock music',
  },
  {
    tag_name: 'pop music',
  },
  {
    tag_name: 'blue',
  },
  {
    tag_name: 'brown',
  },
  {
    tag_name: 'green',
  },
  {
    tag_name: 'orange',
  },
  {
    tag_name: 'pink',
  },
  {
    tag_name: 'pop culture',
  },
];

const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags;
