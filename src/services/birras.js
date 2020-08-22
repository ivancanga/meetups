const calculateBirras = (weather, assistants) => {
  let birras = 0;
  let cajon = 0;
  let obj = {};

  if (weather >= 20 && weather <= 24) {
    birras = assistants;
  } else if (weather < 20) {
    birras = assistants * 0.75;
  } else {
    birras = assistants * 3;
  }

  cajon = Math.ceil(birras / 6);

  obj.birras = birras;
  obj.cajon = cajon;

  return obj;
};

export default calculateBirras;
