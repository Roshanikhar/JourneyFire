
const Joi = require("joi");
const joi=require("joi");

module.exports.listingSchema=Joi.object({ //for the server side validation we done

    listing:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        price:Joi.string().required().min(0),
        //image:Joi.string().allow("",null),
        image:Joi.any(),

    }).required(),

});

//for the server side validation schema for the Reviews

module.exports.reviewSchema = Joi.object({

    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
    }).required()
})
