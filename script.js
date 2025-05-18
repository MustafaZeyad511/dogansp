document.addEventListener('DOMContentLoaded', function() {
    const hoursInput = document.getElementById('hours');
    const rateInput = document.getElementById('rate');
    const employeeSelect = document.getElementById('employeeSelect');
    const monthSelect = document.getElementById('month');
    const yearSelect = document.getElementById('year');
    const grossSalaryDisplay = document.getElementById('grossSalary');
    const contingenciesDisplay = document.getElementById('contingencies');
    const trainingDisplay = document.getElementById('training');
    const unemploymentDisplay = document.getElementById('unemployment');
    const irpfDisplay = document.getElementById('irpf');
    const totalDeductionsDisplay = document.getElementById('totalDeductions');
    const netSalaryDisplay = document.getElementById('netSalary');
    const printButton = document.getElementById('printButton');
    const printPreview = document.getElementById('printPreview');
    const printEmployeeName = document.getElementById('printEmployeeName');
    const printMonth = document.getElementById('printMonth');
    const printYear = document.getElementById('printYear');
    const printGrossSalary = document.getElementById('printGrossSalary');
    const printContingencies = document.getElementById('printContingencies');
    const printTraining = document.getElementById('printTraining');
    const printUnemployment = document.getElementById('printUnemployment');
    const printIRPF = document.getElementById('printIRPF');
    const printTotalDeductions = document.getElementById('printTotalDeductions');
    const printNetSalary = document.getElementById('printNetSalary');
    const printHours = document.getElementById('printHours');
    const printRate = document.getElementById('printRate');

    function updatePrintPreview() {
        printEmployeeName.textContent = employeeSelect.value || 'Employee Name';
        printMonth.value = monthSelect.value;
        printYear.value = yearSelect.value;
        printGrossSalary.textContent = grossSalaryDisplay.textContent;
        printContingencies.textContent = contingenciesDisplay.textContent;
        printTraining.textContent = trainingDisplay.textContent;
        printUnemployment.textContent = unemploymentDisplay.textContent;
        printIRPF.textContent = irpfDisplay.textContent;
        printTotalDeductions.textContent = totalDeductionsDisplay.textContent;
        printNetSalary.textContent = netSalaryDisplay.textContent;
        printHours.textContent = hoursInput.value || '0';
        printRate.textContent = rateInput.value || '0.00';
        printPreview.classList.add('visible');
    }

    printButton.addEventListener('click', function() {
        updatePrintPreview();
        window.print();
        printPreview.classList.remove('visible');
    });

    function calculateSalary() {
        const hours = parseFloat(hoursInput.value) || 0;
        const rate = parseFloat(rateInput.value) || 0;
        const grossSalary = hours * rate;
        
        if (grossSalary === 0) {
            grossSalaryDisplay.textContent = '0.00';
            contingenciesDisplay.textContent = '0.00';
            trainingDisplay.textContent = '0.00';
            unemploymentDisplay.textContent = '0.00';
            irpfDisplay.textContent = '0.00';
            totalDeductionsDisplay.textContent = '0.00';
            netSalaryDisplay.textContent = '0.00';
            return;
        }

        grossSalaryDisplay.textContent = grossSalary.toFixed(2);

        // Calculate the three deductions
        const contingencies = +(grossSalary * 0.0483).toFixed(5);
        const training = +(grossSalary * 0.0010).toFixed(5);
        const unemployment = +(grossSalary * 0.0155).toFixed(5);

        // Calculate net salary after three deductions
        const afterDeductions = grossSalary - contingencies - training - unemployment;

        // Subtract fixed IRPF 451.95
        const irpf = 451.95;

        // Total deductions
        const totalDeductions = +(contingencies + training + unemployment + irpf).toFixed(5);

        // Final net salary
        const netSalary = +(grossSalary - totalDeductions).toFixed(5);

        // Update display
        contingenciesDisplay.textContent = contingencies.toFixed(4);
        trainingDisplay.textContent = training.toFixed(4);
        unemploymentDisplay.textContent = unemployment.toFixed(4);
        irpfDisplay.textContent = irpf.toFixed(2);
        totalDeductionsDisplay.textContent = totalDeductions.toFixed(4);
        netSalaryDisplay.textContent = netSalary.toFixed(4);
    }

    hoursInput.addEventListener('input', calculateSalary);
    rateInput.addEventListener('input', calculateSalary);
    employeeSelect.addEventListener('change', calculateSalary);
    calculateSalary(); // Initial calculation on load
});
