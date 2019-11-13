/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

// I used let to declare studentsList variable because i reasign it later
let studentsList = document.querySelectorAll('.student-item');
const studentsListContainer = document.querySelector('.student-list');
const pages = document.querySelector('.page');
const studentPerPage = 10;
const startPageNumber = 1;


//showpage function displays the list of student per page once the link is clicked.
const showPage = (list, page) => {
// firstIndex and lastIndex variables retreive the index for the first and last student on the on a particular page.
  const firstIndex = page * studentPerPage - studentPerPage
  const lastIndex = page * studentPerPage

//loop through the list of student and show or hide students based on the page number that was clicked.
  for(let i = 0; i < list.length; i++) {
      if(i >= firstIndex && i < lastIndex){
        list[i].style.display = '';
      } else {
        list[i].style.display = 'none';
      }
  }
}

// const pages = document.querySelector('.page');

const appendPageLinks = (list) => {
  const numOfPage = Math.ceil(list.length / studentPerPage);
  const div = document.createElement('div');
  const ul = document.createElement('ul');
  div.className = 'pagination';
  div.appendChild(ul);
  pages.appendChild(div);

// create links for each page
  for(i = 1; i <= numOfPage; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a')
// add page number to each link
    a.innerHTML = `${i}`;
    a.href = '#';
    li.appendChild(a);
    ul.appendChild(li);
// highlight current page link upon intial load
    if(i == startPageNumber){
      a.className = 'active';
    }
  }



  const links = document.querySelectorAll('a');
// loop through and assign click event to each one
  for(i = 0; i < links.length; i++) {
    const link = links[i];
    link.addEventListener('click', (e) => {
// loop through each link, make sure only one link has a class active.
      for(i = 0; i < links.length; i++) {
        if (links[i].innerHTML == e.target.innerHTML) {
          links[i].className = 'active'
        } else {
          links[i].className = ''
        }
      }
      showPage(list, e.target.innerHTML);
    });
  }
}


// call both appendPageLinks and showPage function to load links and first page.
showPage(studentsList, startPageNumber);
appendPageLinks(studentsList);

// I used let to declare paginationContainer variable because i reasign it later
let paginationContainer = document.querySelector('.pagination')

/***
Search functionality below
***/

// select and create input tag, button tag for search etc
const pageHeader = document.querySelector('.page-header');
const searchDiv = document.createElement('div');
searchDiv.className = 'student-search';
const input = document.createElement('input');
input.placeholder="Search for students...";
input.id = 'search-input';
const button = document.createElement('button');
button.innerHTML = 'Search';
button.id = 'search';
searchDiv.appendChild(input);
searchDiv.appendChild(button);
pageHeader.appendChild(searchDiv);

//select input with id '#search-input', searchButton tag with id '#search' and select the names of all student from the h3 tag.
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search');
const students = document.querySelectorAll('.student-item .student-details h3');

//create a no results message and append it to the DOM
let noMatch;
const p  = document.createElement('p')
const text = 'No results, Please search for another name.';
p.innerText = text;
p.id = 'no-results'
pages.insertBefore(p, studentsListContainer)
noMatch = studentsListContainer.previousElementSibling;
noMatch.style.display = 'none';

//noResult function displays the "no results" message when the input is empty or when there is not a match.
const noResult = () => {
  studentsListContainer.style.display = 'none';
  noMatch.style.display = '';
}


//searchFunction loops through list of names to only display letters or names that matches the input value.
//set the innerHTML for student-list class and student-item class to empty.
const searchFunction = (searchInput, students) => {
  const names = [];
  const input = searchInput.value.toLowerCase().trim();
  paginationContainer = document.querySelector('.pagination');

  if(paginationContainer !== null){
    pages.removeChild(paginationContainer);
  }

  if(input.length === 0){
    noMatch.style.display = 'none';
    studentsListContainer.style.display = ''
    showPage(studentsList, startPageNumber);
    appendPageLinks(studentsList);
  } else  {
    for(let i = 0; i < students.length; i++) {
      students[i].style.display = 'none';
      const studentNode = students[i].childNodes[1].childNodes[3].textContent;
      if(input.length !== 0 && studentNode.includes(input)){
        names.push(students[i])
      }
    }

    if(names.length === 0){
      noResult();
    } else {
      studentsListContainer.style.display = '';
      noMatch.style.display = 'none';
      showPage(names, 1);
      appendPageLinks(names);
    }
  }
}

//add click and keyup event on the search button and reset input value to empty.
searchInput.addEventListener('keyup', () => {
  searchFunction(searchInput, studentsList);
});

searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  searchFunction(searchInput, studentsList);
  searchInput.value = '';
});
