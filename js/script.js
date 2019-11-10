/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

// I used let to declare studentsList variable because i reasign it later
let studentsList = document.querySelectorAll('.student-item');

const studentsListContainer = document.querySelector('.student-list');
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

const pages = document.querySelector('.page');

const appendPageLinks = (list) => {
  const numOfPage = Math.ceil(studentsList.length / studentPerPage);
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
      showPage(studentsList, e.target.innerHTML);
    });
  }
}

const noResult = () => {
  studentsListContainer.innerHTML = 'No results, Please refresh and search for another name.'
  studentsListContainer.id = 'no-results'
}


// call both appendPageLinks and showPage function to load links and first page.
appendPageLinks(studentsList);
showPage(studentsList, startPageNumber);

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

//loop through list of names to only display letters or names that matches the input value.
//set the innerHTML for student-list class and student-item class to empty.
const searchFunction = (searchInput) => {
  const input = searchInput.value.toLowerCase();
  paginationContainer = document.querySelector('.pagination')

  if(paginationContainer === null || studentsList.length === 0 || input === '' ){
    noResult();
  } else {
    studentsListContainer.innerHTML = '';
    pages.removeChild(paginationContainer)

    for(let i = 0; i < studentsList.length; i++) {
      const studentName = studentsList[i].childNodes[1].childNodes[3].textContent
      if(studentName.includes(input)){
        studentsListContainer.appendChild(studentsList[i]);
      }
    }
/**
if the UL with the student-list class is not empty reasign the studentsList variable
with the new list of all the names that matches the value of the search node.
**/

    if (studentsListContainer.innerHTML !== '') {
      studentsList = document.querySelectorAll('.student-item');
      appendPageLinks(studentsList);
    } else {
      noResult();
    }
  }
}

//add click and keyup event on the search button and reset input value to empty.
searchInput.addEventListener('keyup', () => {
  searchFunction(searchInput);
});

searchButton.addEventListener('click', () => {
  searchFunction(searchInput);
  searchInput.value = '';
});
