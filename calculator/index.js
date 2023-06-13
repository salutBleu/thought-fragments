// 계산기를 나타내는 클래스
class Calculator {
	constructor() {
		// 인스턴스 변수 초기화
		this.currentResult = ""; // 현재 결과를 저장하는 변수
		this.calculationString = ""; // 계산식을 저장하는 변수
		this.resultElement = document.getElementById("result"); // HTML의 result 요소에 대한 참조

		// DOMContentLoaded와 keydown 이벤트에 대한 이벤트 리스너
		document.addEventListener("DOMContentLoaded", () => {
			this.resultElement.value = this.currentResult; // result 요소의 초기값 설정
		});

		document.addEventListener("keydown", (event) => {
			this.handleKeyPress(event.keyCode); // 키 입력 이벤트 처리
		});
	}

	// 숫자를 현재 결과에 추가
	appendNumber(number) {
		this.currentResult += number;
		this.resultElement.value = this.currentResult;
	}

	// 소수점을 현재 결과에 추가
	appendDecimal(decimal) {
		if (!this.currentResult.includes(decimal)) {
			this.currentResult += decimal;
			this.resultElement.value = this.currentResult;
		}
	}

	// 연산자(+, -, *, /) 수행
	performOperation(operator) {
		this.calculationString += this.currentResult + operator;
		this.currentResult = "";
		this.resultElement.value = this.currentResult;
	}

	// 현재 결과와 계산식 초기화
	clearResult() {
		this.currentResult = "";
		this.calculationString = "";
		this.resultElement.value = this.currentResult;
	}

	// 결과 계산 및 표시
	calculateResult() {
		this.calculationString += this.currentResult;
		const result = eval(this.calculationString);
		this.resultElement.value = result;
		this.currentResult = result.toString();
		this.calculationString = "";
	}

	// 키(key) 이벤트 처리
	handleKeyPress(keyCode) {
		if (keyCode >= 48 && keyCode <= 57) {
			const number = keyCode - 48;
			this.appendNumber(number.toString());
		}

		if (keyCode === 190 || keyCode === 110) {
			this.appendDecimal(".");
		}

		if (keyCode === 107 || keyCode === 187) {
			this.performOperation("+");
		} else if (keyCode === 109 || keyCode === 189) {
			this.performOperation("-");
		} else if (keyCode === 106 || keyCode === 56) {
			this.performOperation("*");
		} else if (keyCode === 111 || keyCode === 191) {
			this.performOperation("/");
		}

		if (keyCode === 13) {
			this.calculateResult();
		}

		if (keyCode === 27) {
			this.clearResult();
		}
	}
}

// Calculator 클래스의 인스턴스 생성
const calculator = new Calculator();