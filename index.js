#!/usr/bin/env node

import * as p from '@clack/prompts';
import { setTimeout } from 'node:timers/promises';
import figlet from 'figlet';
import gradient from 'gradient-string';
let totalCorrect = 0
const welcomeText = "WORLD TRIVIA"
figlet(welcomeText , (err,data) => {
   console.log( gradient.cristal.multiline(data))
})


async function askQuestion(question, answers, correctAnswerIndex) {
	const options = []
	answers.forEach((answer) => {
		options.push({value: answer, label: answer})
	})

	const answer = await p.select({
		message: question,
		initialValue: '1',
		options: options,
	})

	const s = p.spinner();
	s.start();
	await setTimeout(1000);
	s.stop();

	if (answer == answers[correctAnswerIndex]) {
		totalCorrect++
	}
}

class Question {
	constructor(question, answersArray, correctAnswerIndex) {
		this.question = question;
		this.answersArray = answersArray;
		this.correctAnswerIndex = correctAnswerIndex;
	}
}

async function main() {
	console.clear();

	await setTimeout(1000);

	p.intro(`${(gradient.passion(' Welcome. Lets see how much do you know about the world'))}`);


	const question1 = new Question(
		"1) Where is the Mekong River originated from?",
		[
		"Qinghai ",
		"Shanghai",
		"Laos",
		"Phnom Penh"],
		0,
		
	)

	const question2 = new Question(
		"2) What is the southernmost point of Africa called?",
		[
		"Cape Verde",
		"Cape Town",
		"Cape Agulhas",
		"Bab el Mandep"],
		2,
	)

	const question3 = new Question(
		"3) Where is world's first pyramid located",
		[
		"Giza",
		"Saqqara",
		"Dahsur",
		"Borobudur"],
		1,
	)

	const question4 = new Question(
		"4)  What's the capital of Lithuania",
		[
		"Malta",
		"Velleta",
		"Budapest",
		"Vilnius"],
		3,
	)

	const question5 = new Question(
		"5) Where is Bhimbetka caves located?",
		[
		"Madhya Pradesh",
		"Kerala",
		"Bihar",
		"Mizoram"],
		0,
	)

	const question6 = new Question(
		"6)The Vikram Sarabhai Space Centre is based at",
		[
		"Chennai",
		"Mohali",
        "Bangalore",
        "Thiruvananthapuram"
    ],
		3,
	)

	const question7 = new Question(
		"7) What is the largest island in the Mediterranean Sea ?",
		[
		"Sicily",
		"Capri",
		"Ibiza",
		"Santorini"],
		0,
	)


	const allQuestions = [question1, question2, question3, question4, question5, question6, question7]

	
	const readyToPlay = await p.select({
		message: "7 questions are there . Results at the end. Ready to play?",
		initialValue: "Yes",
		options: [
			{value: "Yes", label: "Yes"},
			{value: "No", label: "No"}],
	})

	if (readyToPlay == "Yes") {

		for (const question of allQuestions) {
			await askQuestion(question.question, question.answersArray, question.correctAnswerIndex)
		}

		
		p.outro(`${(gradient.cristal(`You got ${totalCorrect} questions correct!`))}`);
	
		if (totalCorrect == 7) {
			const s = p.spinner();
			s.start("Generating secret message");
			await setTimeout(3000);
			s.stop();
			p.outro(`${gradient.pastel((`AALU ARJUN`))}`);
		} else {
			const s = p.spinner();
			s.start();
			await setTimeout(3000);
			s.stop();
			p.outro(`${gradient.cristal(`You need 7/7 correct to unlock the secret message. Try again.`)}`);
		}
	} else {
		p.outro(`${gradient.instagram(`Ok. Bye!`)}`);
	}

}

main().catch(console.error);