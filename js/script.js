/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing
const studentsList = document.querySelectorAll('.student-item');

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

let pages = document.querySelector('.page');

const appendPageLinks = (list) => {
  const numOfPage = Math.ceil(studentsList.length / studentPerPage);
  const div = document.createElement('div');
  const ul = document.createElement('ul');
  div.className = 'pagination';
  div.appendChild(ul);
  pages.appendChild(div);

// create links for each page
  for(i = 1; i <= numOfPage; i++) {
    let li = document.createElement('li');
    let a = document.createElement('a')
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

  let links = document.querySelectorAll('a');
// loop through and assign click event to each one
  for(i = 0; i < links.length; i++) {
    let link = links[i];
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

// call both appendPageLinks and showPage function to load links and first page.
appendPageLinks(studentsList);
showPage(studentsList, startPageNumber);

// select and create input tag, button tag for search etc
let pageHeader = document.querySelector('.page-header');
let searchDiv = document.createElement('div');
searchDiv.className = 'student-search';
let input = document.createElement('input');
input.placeholder="Search for students...";
input.id = 'search-input';
let button = document.createElement('button');
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
let searchFunction = (searchInput, names) => {
      for(let i = 0; i < names.length; i++) {
        if(names[i].textContent.includes(searchInput.value)){
          studentsList[i].style.display = '';
        } else {
          studentsList[i].style.display = 'none';
        }
      }
    }


// add click event on the search button and reset input value to empty.
searchButton.addEventListener('click', () => {
  searchFunction(searchInput, students);
  searchInput.value = '';
});
