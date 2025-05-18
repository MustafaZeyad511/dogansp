document.addEventListener('DOMContentLoaded', () => {
  // جلب العناصر
  const employeeSelect = document.getElementById('employeeSelect');
  const monthSelect = document.getElementById('month');
  const yearSelect = document.getElementById('year');
  const hoursInput = document.getElementById('hours');
  const rateInput = document.getElementById('rate');
  const calculateBtn = document.getElementById('calculateBtn');

  const printPreview = document.getElementById('printPreview');
  const printEmployeeName = document.getElementById('printEmployeeName');
  const printMonthText = document.getElementById('printMonthText');
  const printYearText = document.getElementById('printYearText');
  const printGrossSalary = document.getElementById('printGrossSalary');
  const printHours = document.getElementById('printHours');
  const printRate = document.getElementById('printRate');
  const printContingencies = document.getElementById('printContingencies');
  const printTraining = document.getElementById('printTraining');
  const printUnemployment = document.getElementById('printUnemployment');
  const printIRPF = document.getElementById('printIRPF');
  const printTotalDeductions = document.getElementById('printTotalDeductions');
  const printNetSalary = document.getElementById('printNetSalary');

  function calculateSalary() {
    const employee = employeeSelect.value || '-';
    const month = monthSelect.value || '-';
    const year = yearSelect.value || '-';
    const hours = parseFloat(hoursInput.value) || 0;
    const rate = parseFloat(rateInput.value) || 0;
    const grossSalary = hours * rate;

    // الخصومات
    const contingencies = +(grossSalary * 0.0483).toFixed(5);
    const training = +(grossSalary * 0.0010).toFixed(5);
    const unemployment = +(grossSalary * 0.0155).toFixed(5);

    // IRPF ثابت
    const irpf = 451.95;

    // حساب صافي الراتب
    const totalDeductions = +(contingencies + training + unemployment + irpf).toFixed(5);
    const netSalary = +(grossSalary - totalDeductions).toFixed(5);

    // عرض النتائج في نافذة الطباعة
    printEmployeeName.textContent = employee;
    printMonthText.textContent = month;
    printYearText.textContent = year;
    printGrossSalary.textContent = grossSalary.toFixed(4);
    printHours.textContent = hours;
    printRate.textContent = rate.toFixed(2);
    printContingencies.textContent = contingencies.toFixed(4);
    printTraining.textContent = training.toFixed(4);
    printUnemployment.textContent = unemployment.toFixed(4);
    printIRPF.textContent = irpf.toFixed(2);
    printTotalDeductions.textContent = totalDeductions.toFixed(4);
    printNetSalary.textContent = netSalary.toFixed(4);

    // إظهار نافذة الطباعة
    printPreview.classList.add('visible');
  }

  calculateBtn.addEventListener('click', calculateSalary);

  // حساب أولي عند تحميل الصفحة
  calculateSalary();
});
