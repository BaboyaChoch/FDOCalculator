import FDOCalcualtor from "./calculator/FDOCalculator.js";

const calculateButton = document.getElementById("calculate_button");

const inputError = document.getElementById("error");

const resultsTable = document.getElementById("results-table");
const RESULTS_HEADER = resultsTable.innerHTML;

const getDegreeStep = () => document.getElementById("degreeStep").value;

const getDegreeStart = () => document.getElementById("degreeStart").value;

const getUnit = () => document.querySelector('input[name="unit"]:checked').value;

// @TODO write function to call a script or api to get the calculation results
const getResults = (diameter1, diameter2) =>
	FDOCalcualtor.calculate(diameter1, diameter2, getUnit(), getDegreeStart(), getDegreeStep());

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
	const diameter1 = parseFloat(document.getElementById("diameter_1").value);
	const diameter2 = parseFloat(document.getElementById("diameter_2").value);
	const degreeStart = parseFloat(document.getElementById("degreeStart").value);

	if (diameter1 === "" || diameter2 === "") return;

	if (diameter1 < diameter2) {
		inputError.innerHTML = "Input the larger diameter in 'Diameter 1' input field";
		inputError.style.display = "initial";
		event.preventDefault();
		return;
	}

	if (degreeStart > 90) {
		inputError.innerHTML = "The start degree must be less than or equal to 90";
		inputError.style.display = "initial";
		event.preventDefault();
		return;
	}

	inputError.innerHTML = "";
	inputError.style.display = "none";
	event.preventDefault();

	const results = getResults(diameter1, diameter2);
	resultsTable.innerHTML = RESULTS_HEADER + createTableRows(results);
};
calculateButton.addEventListener("click", onCalculate);
