const Joi = require("joi");
const { findOne, updateDocument } = require("../../../helpers");
const profile = require("../../../models/Profile/index");
const cloudinary = require("cloudinary").v2;

const schema = Joi.object({
  username: Joi.string(),
  email: Joi.string(),
  wallet: Joi.string(),
  city: Joi.string(),
  gender: Joi.string(),
  category: Joi.string(),
  preference: Joi.string(),
  // profile_img: Joi.string(),
  // profile_img_url: Joi.string(),
  login_prefrence: Joi.string(),
  company_description: Joi.string(),
  verified: Joi.string(),
});

const updateProfile = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    console.log(req.body);
    console.log(req.file);
    // const { email } = req.body;
    const _id = req.params.id;

    let profile = await findOne("profile", { _id });
    if (!profile) {
      return res.status(400).send({ status: 400, message: "No User Found" });
    }
    // if (email) {
    //     let check_email = await findOne("profile", { email });
    //     if (check_email) {
    //         if (user.email !== email) {
    //             return res.status(400).send({
    //                 status: 400,
    //                 message: "User already exist with this email",
    //             });
    //         }
    //     }
    // }

    console.log(profile, "user....");

    // const deleteId = await cloudinary.uploader.destroy(
    //   profile.profile_img_url,
    //   function (error, result) {
    //     console.log(result, error);
    //   }
    // );
    // if (req?.files?.profile_img?.path) {
    //     const profileImage = await cloudinary.uploader.upload(
    //         req?.files?.profile_img?.path
    //     );
    //     req.body.profile_img = profileImage.url;

    // }

    

    // const result = await cloudinary.uploader.upload(req.file.path);

    // console.log(result, "result....");

    const data = {
      username: req.body.username || profile.username,
      email: req.body.email || profile.email,
      wallet: req.body.wallet || profile.wallet,
      city: req.body.city || profile.city,
      gender: req.body.gender || profile.gender,
      category: req.body.categories || profile.category,
      preference: req.body.preference || profile.username.preference,
      profile_img:  profile.profile_img,
      profile_img_url: profile.profile_img_url,
      login_prefrence: req.body.login_prefrence || profile.login_prefrence,
      company_description:
        req.body.company_description || profile.company_description,
      verified: req.body.verified || profile.verified,
    };

    userProfile = await updateDocument("profile", { _id }, data);

    return res
      .status(200)
      .send({ status: 200, message: "User Updated Successfully", userProfile });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = updateProfile;
