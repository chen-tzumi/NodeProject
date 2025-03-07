import chalk from "chalk";
export const badRequest404 = (req, res) => {
    console.log(chalk.redBright(`404 - Not Found`));
    res.status(404).sendFile('public/404.html', { root: process.cwd() });
};
