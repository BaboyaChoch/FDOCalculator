import FDOCalcualtor from "./calculator/FDOCalculator.js";

const calculateButton = document.getElementById("calculate_button");

const inputError = document.getElementById("error");

const resultsTable = document.getElementById("results-table");
const RESULTS_HEADER = resultsTable.innerHTML;

const getStep = () => document.getElementById("step").value;

const getIncrementStart = () => document.getElementById("IncrementStart").value;

const getUnit = () => document.querySelector('input[name="unit"]:checked').value;

// @TODO write function to call a script or api to get the calculation results
const getResults = (diameter1, diameter2) => FDOCalcualtor.calculate(diameter1, diameter2, getUnit(),getIncrementStart(),getStep());

// aux function to create the table rows of results
const createTableRows = (results) => {
	const tableRows = [];
	for (const [key, value] of results) {
		tableRows.push(`<tr><td>${key}°</td><td class="result">${value ? value : ""}${getUnit()}</td></tr>`);
	}
	return tableRows.join("");
};

// whem calculate button is clicked, get the values from the inputs and call the function to get the results and display them
const onCalculate = (event) => {
	const diameter1 = parseInt(document.getElementById("diameter_1").value);
	const diameter2 = parseInt(document.getElementById("diameter_2").value);

	if (diameter1 === "" || diameter2 === "") return;

	if (diameter1 < diameter2) {
		inputError.style.display = "initial";
		event.preventDefault();
		return;
	}

	inputError.style.display = "none";
	event.preventDefault();

	const results = getResults(diameter1, diameter2);
	resultsTable.innerHTML = RESULTS_HEADER + createTableRows(results);
};
calculateButton.addEventListener("click", onCalculate);
