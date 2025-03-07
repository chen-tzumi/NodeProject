import chalk from "chalk";
export const badRequest500 = (req, res) => {
    console.log(chalk.redBright(`500 - something went roung`));
    res.status(500).send("500 - something went roung");;
};

