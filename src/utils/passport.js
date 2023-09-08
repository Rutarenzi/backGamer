import passport from "passport";
import PassportLocal from "passport-local";
import BcryptUtils from "./brcypt";
import User from "../database/models/user";

passport.use(
    new PassportLocal.Strategy(
        {
            usernameField: "username",
            passwordField: "password",
        },
        async (username,password, done ) => {
            const userFound = await User.findOne({
                where: { username },
            });
           
            if(!userFound){
                return done(null, false, { message: "User not Found"});
            };

            const pswdExist =  BcryptUtils.compare(password,userFound.password);
            
            if(!pswdExist) {
                return done(null, false, { message: "Incorrect password"});
            }

            return done(null, userFound);

        }
    )
)

