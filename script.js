var LEVEL = 1; 

const NUMBER_OF_AVAILABLE_IMAGES = 11;

const MAX_LEVELS = NUMBER_OF_AVAILABLE_IMAGES ;
const GRID = document.getElementById('grid_container');

var differnet_image_id = "";



function start_level(level)
{
    const n_of_images = calculate_number_of_images(level);
    
    const images_names_array = create_images_names_array(n_of_images)
    // [1, 2, 3]
    let random_number = Math.floor(Math.random() * images_names_array.length);
    
    const differnet_image_name = images_names_array[random_number];
    // 2  
    const cleaned_images_names_array = duplicate_identicals(images_names_array, differnet_image_name);
    // [1, 1, 2, 3, 3]

    const shuffled_images_names_array = shuffleOddIndices(cleaned_images_names_array);
    // [1, 3, 2, 1, 3]

    differnet_image_id = differnet_image_name;

    fill_grid(shuffled_images_names_array);
}

function calculate_number_of_images(level)
{
    return level + 1;
}

function create_item(img_name)
{
  
  var item = document.createElement('div');
  item.className = 'grid-item';

  var imgLink = document.createElement('a');
  imgLink.href = '#';
  
  var img = document.createElement('img');
  img.src = `imgs/${img_name}.jpg`;
  img.onclick = handleOnClick;
  img.name = img_name;
  
  imgLink.appendChild(img);
  item.appendChild(imgLink);

  return item;
}
function create_images_names_array(n_of_images)
{
    let images_names_array = [];
    i = 0;
    while(i < n_of_images) 
    {
      // generate random number [1, NUMBER_OF_IMAGES]
      const random_number = Math.floor(Math.random() * NUMBER_OF_AVAILABLE_IMAGES) + 1;

      // check if the generated number is already in the array
      if(images_names_array.includes(random_number))
        continue;

      // push the generated number into the array
      images_names_array.push(random_number);

      // increment the i counter
      i++;
    }
    
    return images_names_array;
  
}
function duplicate_identicals(images_names_array, differnet_image_name)
{
    const cleaned_images_names_array = [];

    images_names_array.forEach(image_name =>
    {
        cleaned_images_names_array.push(image_name);
        if(image_name !== differnet_image_name) 
          cleaned_images_names_array.push(image_name);
    
    });

    return cleaned_images_names_array;
}
function shuffleOddIndices(arr) 
{
    const oddIndices = arr.filter((_, index) => index % 2 !== 0);
    const shuffledOdd = shuffleArray(oddIndices);
    
    let j = 0;
    for (let i = 1; i < arr.length; i += 2) {
      arr[i] = shuffledOdd[j];
      j++;
    }
    
    return arr;
}
function shuffleArray(array) 
{
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function fill_grid(images_names_array)
{
  images_names_array.forEach(image_name =>
    {
        GRID.appendChild(create_item(image_name));
    });
  
}

function levelUp(level)
{
    const el = document.getElementById('level_no_div');

    el.innerHTML = `<h2> Level ${level} </h2>`;

}

const handleOnClick =  (event) =>
{
    const el = event.target;

    console.log(el.name, differnet_image_id);

    const selected_image_name = el.name;
    if(selected_image_name === differnet_image_id.toString()) 
    {
        LEVEL++;
        reset();
        levelUp(LEVEL);
        checkEndgame(LEVEL, MAX_LEVELS);
        start_level(LEVEL);
        
    }
    else
    {
        alert("LOOOOOSER!!");
        reset();
        LEVEL = 1;
        levelUp(LEVEL);

        start_level(LEVEL);

    }

}

function reset()
{
    GRID.innerHTML = '';
}

function checkEndgame(lvlNo, maxLvl)
{
  if(lvlNo == maxLvl)
  {
      alert("CONGRATULATIONS!!");
      reset();
      LEVEL = 1;
      levelUp(LEVEL);
  }
}

start_level(LEVEL);
levelUp(LEVEL);