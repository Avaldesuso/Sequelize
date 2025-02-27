async function getMeals() {
  console.log('data request');
  const diningRequest = await fetch('api/Meal');
  const diningData = await diningRequest.json();
  return diningData;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); 
}

async function Dhauler() {
    const endpoint = await fetch('/api/dining');
    const data = await endpoint.json();
    const table = document.querySelector('tbody');
    data.data.forEach((item) => {
      const location = document.createElement('tr');
      location.innerHTML = `
      <th>${item.hall_id}</th>
      <th>${item.hall_name}</th>
      <th>${item.hall_address}</th>`;
      table.append(location);
    });
  }

  async function windowActions() {
    console.log('window loaded');
    const results = await getMeals();
    const meals = results.data;
    console.table(meals.data);
  
    const mealArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const selectedMeals = mealArray.map((element) => {
      const random = getRandomIntInclusive(0, meals.length - 1);
      return meals[random];
    });
    Dhauler();
  
    console.table(selectedMeals);
  
    const datapoints_meals = [];
    selectedMeals.forEach((element) => {
      const location = [element.meal_name, element.calories, element.cholesterol, element.sodium, element.carbs, element.protein, element.fat];
      datapoints_meals.push(location);
    });
  
    console.log(datapoints_meals);
  
    const datapoints_calories = [];
    const datapoints_cholesterol = [];
    const datapoints_sodium = [];
    const datapoints_carbs = [];
    const datapoints_protein = [];
    const datapoints_fat = [];
    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      title:{
        text: 'Dining Hall Macros'
      },
      toolTip: {
        shared: true
      },
      legend:{
        cursor: 'pointer',
        itemclick: toggleDataSeries
      },
      data: [{
        type: 'stackedBar',
        name: 'Calories',
        showInLegend: 'true',
        toolTipContent: '{label}<br><b>{name}:</b> {y}',
        dataPoints: datapoints_calories
      },
      {
        type: 'stackedBar',
        name: 'Cholesterol',
        showInLegend: 'true',
        toolTipContent: '<b>{name}:</b> {y}',
        dataPoints: datapoints_cholesterol
      },
      {
        type: 'stackedBar',
        name: 'Sodium',
        showInLegend: 'true',
        toolTipContent: "<b>{name}:</b> {y}",
        dataPoints: datapoints_sodium
      },
      {
        type: 'stackedBar',
        name: 'Carbs',
        showInLegend: 'true',
        toolTipContent: '<b>{name}:</b> {y}',
        dataPoints: datapoints_carbs
      },
      {
        type: 'stackedBar',
        name: 'Protein',
        showInLegend: 'true',
        toolTipContent: '<b>{name}:</b> {y}',
        dataPoints: datapoints_protein
      },
      {
        type: 'stackedBar',
        name: 'Fat',
        showInLegend: 'true',
        toolTipContent: '<b>{name}:</b> {y}',
        dataPoints: datapoints_fat
      }]
    });
    async function addDatapoints() {
      datapoints_meals.forEach((value) => {
        datapoints_calories.push({label: value[0], y: value[1]}),
        datapoints_cholesterol.push({label: value[0], y: value[2]}),
        datapoints_sodium.push({label: value[0], y: value[3]}),
        datapoints_carbs.push({label: value[0], y: value[4]}),
        datapoints_protein.push({label: value[0], y: value[5]}),
        datapoints_fat.push({label: value[0], y: value[6]})
      });
    }
    await addDatapoints();
    chart.render();
    
    function toggleDataSeries(e) {
      if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      }
      else {
        e.dataSeries.visible = true;
      }
      chart.render();
    }
  }
  
  window.onload = windowActions;