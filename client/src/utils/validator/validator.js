import validate from 'validate.js';
import constraint from './constraint';

export const username = userName => validate.single(userName, constraint.username);

export const password = pwsd => validate.single(pwsd, constraint.password);

export const email = eMail => validate.single(eMail, constraint.email);

export const fullname = fullName => validate.single(fullName, constraint.fullname);

export const review = reView =>
validate.single(reView, constraint.presenceAndLength('review'));

export const item = (itm, itemName) =>
validate.single(itm, constraint.presenceAndLength(itemName));

export const recipeName = (recipename, itemName) =>
validate.single(recipename, constraint.presenceAndLength(itemName));

export const category = (cat, itemName) =>
validate.single(cat, constraint.presenceAndLength(itemName));
