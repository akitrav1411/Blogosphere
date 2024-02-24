import crypto from "crypto-js";
import dotenv from "dotenv";
dotenv.config();

const dummyUserGenerator = (userCount = 1, adminUserCount = 1) => {
  const userArr = [];
  const adminUserArr = [];
  [...Array(Math.max(userCount, 1))].map((_, index) => {
    const hashPass = crypto.AES.encrypt("vartika", process.env.SECRET_KEY);
    userArr.push({
      firstname: `User${index}`,
      lastname: "Dummy",
      username: `user${index}`,
      email: `user.dummy${index}@gmail.com`,
      password: hashPass,
      dob: new Date("11-14-2000"),
    });
  });
  [...Array(Math.max(adminUserCount, 1))].map((_, index) => {
    adminUserArr.push({
      firstname: `Admin${index}`,
      lastname: "Dummy",
      username: `admin${index}`,
      email: `admin.dummy${index}@gmail.com`,
      password: crypto.AES.encrypt("vartika", process.env.SECRET_KEY),
      dob: new Date("11-14-2000"),
    });
  });

  return [userArr, adminUserArr];
};

export default dummyUserGenerator;
