import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import isOnline from 'is-online';
import db from '../../models/index';
import emailTemplate from './emailTemplate';
import { PRODUCTION_URL } from '../../constants';

dotenv.load();

const url = PRODUCTION_URL;
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
            html: emailTemplate('see recipe', message, `${url}/recipe/${id}`),
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
        attributes: ['id', 'name'],
        include: {
          model: Users,
          as: 'favoriteUsers',
          through: db.FavRecipe,
          attributes: ['email']
        }
      })
        .then((recipe) => {
          const { name, id, favoriteUsers } = recipe;
          const emails = favoriteUsers.map((user => user.email)) || [];
          if (emails.length < 1) return;
          const message = `Modification have been made to one of your favourite recipes.<br/>
          <p>Recipe name: ${name}</p>`;
          const mailOptions = {
            from: `"MoreRecipes Admin" <${process.env.APP_EMAIL}>`,
            to: emails,
            subject: 'You have a new notification',
            html: emailTemplate('see recipe', message, `${url}/recipe/${id}`),
          };
          transporter.sendMail(mailOptions);
        });
    }
  });
};
