const throwError = (status, message, err) => {
  console.log(err);
  const { name } = err;
    switch (name) {
      case "MongoServerError":
        const { code, keyValue } = err;
        let dupe = Object.keys(keyValue)[0];
        dupe = TitleCase(dupe);
        switch (code) {
          case 11000:
            throw { status: 422, message: `${dupe} is already taken` };
        }
        break;
      case "ValidationError":
        const { message } = err;
        const resToSend = message.split(":").slice(-1)[0].trim();
        throw { status: 500, message: resToSend };
    }
};
