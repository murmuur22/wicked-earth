import chalk from "chalk";

const styles = {
	tomato: chalk.hex("#ff6347"),
	banana: chalk.hex("#FABD30"),
};

export default {
	plain(text: string) {
		console.log(`${text}`);
	},
	bold(text: string) {
		console.log(`> ${chalk.bold(text)}`);
	},
	error(text: string) {
		console.log(`! ${styles.tomato(text)}`);
	},
	warning(text: string) {
		console.log(`! ${styles.banana(text)}`);
	},
};
