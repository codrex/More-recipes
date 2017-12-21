import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import isOnline from 'is-online';
import db from '../../models/index';
import emailTemplate from './template';

dotenv.load();

const url = 'https://more-recipesrex.herokuapp.com';
const { Recipes, Users } = db;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});
/**
 * @name notifyOwner
 * @description controller function that sends notification
 * to the owner of a recipe after a was post on the recipe
 * @function
 * @param {Object} req - Express request object
 * @return {*} void
 */
export const notifyOwner = (req) => {
  isOnline().then((online) => {
    if (online) {
      Recipes.findOne({
        where: { id: req.params.id },
        include: {
          model: Users,
          as: 'owner',
          attributes: ['email']
        }
      })
        .then((recipe) => {
          const { name, owner, id } = recipe;
          const { fullname } = req.createdReview.reviewer;
          const { review } = req.createdReview;
          const message = `${fullname.toUpperCase().bold()} just commented on a recipe that you created.<br/>
          <p>Comment: ${review}</p>
          <p>Recipe name: ${name}</p>`;
          const mailOptions = {
            from: `"MoreRecipes Admin" <${process.env.APP_EMAIL}>`,
            to: owner.email,
            subject: 'You have a new notification',
            html: emailTemplate('Notification', 'see recipe', message, `${url}/recipe/${id}`),
          };
          transporter.sendMail(mailOptions);
        });
    }
  });
};

/**
 * @name notifyFavouriteUsers
 * @description controller function that sends notification
 * to users after a recipe they favourited was updated
 * @function
 * @param {Object} req - Express request object
 * @return {*} void
 */
export const notifyFavouriteUsers = (req) => {
  isOnline().then((online) => {
    if (online) {
      Recipes.findOne({
        where: { id: req.params.id },
        attributes: [name],
        include: {
          model: Users,
          as: 'favoriteUsers',
          through: db.FavRecipe,
          attributes: ['email']
        }
      })
        .then(({ favoriteUsers }) => {
          const emails = favoriteUsers.map((user => user.email));
          const { name, id } = recipe;
          const message = `Modification have been made to one of your favourite recipes (${name})`;
          const mailOptions = {
            from: `"MoreRecipes Admin" <${process.env.APP_EMAIL}>`,
            to: emails,
            subject: 'You have a new notification',
            html: emailTemplate('Notification', 'see recipe', message, `${url}/recipe/${id}`),
          };
          transporter.sendMail(mailOptions);
        });
    }
  });
};
