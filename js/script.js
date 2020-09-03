'use strict';

function titleClickHandler(event) {
  console.log('Link was clicked!');
  event.preventDefault(); //blokowanie domyślnej akcji//const clickedElement = this;
  const clickedElement = this;
  console.log(event);

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');//dodaje klasę active dla klikniętego elementu//

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link / z klikniętego linka weź zawartość atrybutu href, np. #article-2*/

  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) / znajdź na stronie element pasujący do selektora takiego, jak wartość atrybutu href, np. #article-2 – czyli szukamy elementu o id="article-2" */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article / dodaj klasę active do znalezionego artykułu.*/

  targetArticle.classList.add('active');
}


// Submodule 5.4 //

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list', //lista Ul zawierająca tagi poszczególnych artykułów//
  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  let html = ''; //deklarujemy zmienną html do której będziemy doklejać linki//
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  /* for each article */
  for (let article of articles) {
    console.log(article);
    /* get the article id */
    const articleId = article.getAttribute('id');
    /* find the title element  and get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML; //zwróci zawartość selektora, czyli tytuł artykułu
    console.log(articleTitle);
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);
    /* insert link into html variable */
    html = html + linkHTML;
    console.log(html);
  }

  titleList.innerHTML = html;
  console.log(html);

  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
  console.log(customSelector);
  console.log(optArticleSelector);
}
generateTitleLinks();

// Module 6 //

function generateTags(){
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {
    /* [DONE] find tags wrapper */
    const tagsList = article.querySelector(optArticleTagsSelector);
    console.log(tagsList);
    /* [DONE] make html variable with empty string */
    let html ='';
    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
    /* generate HTML of the link */
      console.log(tag);
      const linkTags = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      /* add generated code to html variable */
      console.log(linkTags);
      html = html + linkTags;
      console.log(html);
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsList.innerHTML = html;
    console.log(html);
  /* END LOOP: for every article: */
  }
}
generateTags();


function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* make a new constant "tag" and extract(usuń) tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTagsLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let activeTagsLink of activeTagsLinks){
    /* remove class active */
    activeTagsLink.classList.remove('active');
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const allTagsLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let allTagsLink of allTagsLinks){
  /* add class active */
    allTagsLink.classList.add('active');
  }
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');
  console.log(allLinksToTags);
  /* START LOOP: for each link */
  for(let allLinksToTag of allLinksToTags){
  /* add tagClickHandler as event listener for that link */
    allLinksToTag.addEventListener('click',tagClickHandler);
    /* END LOOP: for each link */
  }
}
addClickListenersToTags();

//DODANIE AUTORA DO ARTYKUŁU

function generateAuthors(){
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* [DONE] START LOOP: for every article: */
  for (let article of articles){
  /* [DONE] find authors wrapper */
    const authorsList = article.querySelector(optArticleAuthorSelector);
    console.log(authorsList);
    /* [DONE] make html variable with empty string */
    let html = '';
    console.log(html);
    /* [DONE] get authors from data-tags attribute */
    const authorTags = article.getAttribute('data-author');
    console.log(authorTags);
    /* generate HTML of the link */
    const linkAuthors = '<a href="#author-' + authorTags + '">' + authorTags + '</a>';
    console.log(linkAuthors);
    /* add generated code to html variable */
    html = html + linkAuthors;
    console.log(html);
    /* insert HTML of all the links into the author wrapper */
    authorsList.innerHTML = html;
    console.log(html);
  }
}
generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* make a new constant "author" and extract(usuń) author from the "href" constant */
  const author = href.replace('#author-', '');
  console.log(author);
  /* find all authors links with class active */
  const activeAuthorsLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(activeAuthorsLinks);
  /* START LOOP: for each active author link */
  for (let activeAuthorsLink of activeAuthorsLinks){
  /* remove class active */
    activeAuthorsLink.classList.remove('active');
  //end LOOP//
  }
  /* find all author links with "href" attribute equal to the "href" constant */
  const allAuthorsLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(allAuthorsLinks);
  /* START LOOP: for each found author link */
  for (let allAuthorsLink of allAuthorsLinks){
    /* add class active */
    allAuthorsLink.classList.add('active');
    //end LOOP//
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}



function addClickListenersToAuthors(){
  /* find all links to authors */
  const allLinksToAuthors = document.querySelectorAll('a[href^="#author-"]');
  console.log(allLinksToAuthors);
  /* START LOOP: for each link */
  for(let allLinksToAuthor of allLinksToAuthors){
    /* add tagClickHandler as event listener for that link */
    allLinksToAuthor.addEventListener('click',authorClickHandler);
    /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();

