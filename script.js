class Calculator {
    constructor() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operator = null;
        this.shouldResetScreen = false;

        this.currentOperandElement = document.querySelector('.current-operand');
        this.previousOperandElement = document.querySelector('.previous-operand');

        this.init();
    }

    init() {
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', () => {
                const action = button.dataset.action;
                const value = button.dataset.value;

                switch (action) {
                    case 'number':
                        this.appendNumber(value);
                        break;
                    case 'operator':
                        this.setOperator(value);
                        break;
                    case 'calculate':
                        this.calculate();
                        break;
                    case 'clear':
                        this.clear();
                        break;
                    case 'delete':
                        this.delete();
                        break;
                    case 'decimal':
                        this.appendDecimal();
                        break;
                    case 'percent':
                        this.percent();
                        break;
                }

                this.updateDisplay();
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9') this.appendNumber(e.key);
            if (e.key === '.') this.appendDecimal();
            if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') this.setOperator(e.key);
            if (e.key === 'Enter' || e.key === '=') this.calculate();
            if (e.key === 'Escape') this.clear();
            if (e.key === 'Backspace') this.delete();
            if (e.key === '%') this.percent();
            this.updateDisplay();
        });
    }

    appendNumber(number) {
        if (this.shouldResetScreen) {
            this.currentOperand = '';
            this.shouldResetScreen = false;
        }
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
    }

    appendDecimal() {
        if (this.shouldResetScreen) {
            this.currentOperand = '0';
            this.shouldResetScreen = false;
        }
        if (!this.currentOperand.includes('.')) {
            this.currentOperand += '.';
        }
    }

    setOperator(op) {
        if (this.operator !== null) {
            this.calculate();
        }
        this.operator = op;
        this.previousOperand = this.currentOperand;
        this.shouldResetScreen = true;
    }

    calculate() {
        if (this.operator === null || this.shouldResetScreen) return;

        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        let result;

        switch (this.operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = current === 0 ? 'Ошибка' : prev / current;
                break;
            default:
                return;
        }

        this.currentOperand = result.toString();
        this.operator = null;
        this.previousOperand = '';
        this.shouldResetScreen = true;
    }

    percent() {
        this.currentOperand = (parseFloat(this.currentOperand) / 100).toString();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operator = null;
    }

    delete() {
        if (this.currentOperand.length === 1 || this.currentOperand === 'Ошибка') {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.slice(0, -1);
        }
    }

    getOperatorSymbol() {
        const symbols = { '+': '+', '-': '−', '*': '×', '/': '÷' };
        return symbols[this.operator] || '';
    }

    updateDisplay() {
        this.currentOperandElement.textContent = this.currentOperand;
        if (this.operator !== null) {
            this.previousOperandElement.textContent = `${this.previousOperand} ${this.getOperatorSymbol()}`;
        } else {
            this.previousOperandElement.textContent = '';
        }
    }
}

new Calculator();
