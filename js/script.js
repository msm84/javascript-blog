'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  tagCloudAuthor: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
};

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
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list';

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
    //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);
    console.log(linkHTML);
    /* insert link into html variable */
    html = html + linkHTML;
    console.log(html);
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
  console.log(customSelector);
  console.log(optArticleSelector);
}
generateTitleLinks();

// Module 6  + poprawki//

function calculateTagsParams(tags) {
  let params = {
    max: 0,
    min: 999999,
  };

  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    } else if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
    console.log(tag + ' is used ' + tags[tag] + ' times');
  }
  return params;
}

function calculateTagClass(count, params) {
  const classNumber = Math.floor(((count - params.min) / (params.max - params.min) * optCloudClassCount + 1));
  return optCloudClassPrefix + classNumber;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {
    /* [DONE] find tags wrapper */
    const tagsList = article.querySelector(optArticleTagsSelector);
    console.log(tagsList);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      console.log(tag);
      //const linkTags = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      const linkTagData = { id: tag };
      const linkTags = templates.tagLink(linkTagData);
      /* add generated code to html variable */
      html = html + linkTags;
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) { // ! to negacja, czyli jeśli NIE MA klucza tag
        /* [NEW] add tag to allTags object*/
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsList.innerHTML = html;
    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  /* [NEW] create variable for all links HTML code */
  /*let allTagsHTML = ''; wcześniej uzywalismy tej zmiennej bez szablonów */
  const allTagsData = { tags: [] };
  /*[NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /*[NEW] generate code of a link and add it to allTagsHTML */
    //wersja z licznikiem//
    //allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">'+ tag + ' ' + '(' + (allTags[tag])+ ')' + ' </a></li>';//
    //wersja z chmurą tagów bez licznika wystąpień://
    //allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">'+ tag + ' </a></li>';
    /* Wersja z szablonami i dodawaniem kolejnych obiektów*/
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  /* [NEW] END LOOP: for each tag in allTags: */
  /* [NEW] add html from allTagsHTML to taglist */
  //tagList.innerHTML = allTagsHTML;
  /* Wersja z szablonami, zmianiamy powyzsza linie*/
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log(allTagsData);
  console.log(allTags);
}
generateTags();


function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract(usuń) tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTagsLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let activeTagsLink of activeTagsLinks) {
    /* remove class active */
    activeTagsLink.classList.remove('active');
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const allTagsLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let allTagsLink of allTagsLinks) {
    /* add class active */
    allTagsLink.classList.add('active');
  }
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');
  console.log(allLinksToTags);
  /* START LOOP: for each link */
  for (let allLinksToTag of allLinksToTags) {
    /* add tagClickHandler as event listener for that link */
    allLinksToTag.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}
addClickListenersToTags();

//DODANIE AUTORA DO ARTYKUŁU

function generateAuthors() {
  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /*let allAuthorsHTML = ''; - tej zmiennej uzywalem bez szablonow - zmieniam na stałą z obiektem i tablicą allAuthorsData */
  const allAuthorsData = {authors: []};
  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {
    /* [DONE] find authors wrapper */
    const authorsList = article.querySelector(optArticleAuthorSelector);
    console.log(authorsList);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get authors from data-tags attribute */
    const authorTags = article.getAttribute('data-author');
    console.log(authorTags);
    /* generate HTML of the link - w ten sposób bez szablonu*/
    //const linkAuthors = '<a href="#author-' + authorTags + '">' + 'by ' + authorTags + '</a>';
    /* a tak z szablonem*/
    const linkAuthorData = {id: authorTags};
    const linkAuthors = templates.authorLink(linkAuthorData);
    console.log(linkAuthors);
    /* add generated code to html variable */
    html = html + linkAuthors;

    console.log(html);

    //[NEW] check if this link is NOT already in allAuthors */
    if (!allAuthors.hasOwnProperty(authorTags)) { // ! to negacja, czyli jeśli NIE MA autora
      //[NEW] add author to allAuthors object - to dodaj tego autora do obiektu */
      allAuthors[authorTags] = 1;
    } else {
      allAuthors[authorTags]++;
    }

    /* insert HTML of all the links into the author wrapper */
    authorsList.innerHTML = html;
    console.log(html);
    /* END LOOP for every article */
  }

  /* Pętla iterująca po autorach w celu wygenerowania linków wraz z licznikiem. */
  for (let author in allAuthors){
    /* tak link bez szablonu: */
    // const linkAuthors = '<li><a href="#author-' + author + '">' + author + ' ' + '('+ allAuthors[author] + ')' + '</a></li>';
    /*allAuthorsHTML += linkAuthors; - zmieniamy tę linię, poniewaz w szablonach chcemy dodawać kolejny obiekt do tablicy allAuthorsData dodawać kolejny obiekt */
    /* tak z szablonem */
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author]
    });
  }

  /* [NEW] find list of authors in right column*/
  const authorsList = document.querySelector('.authors');
  console.log(authorsList);

  /* [NEW] add html from allAuthorsHTML to authorslist */
  /* jak nizej bez szablonu: */
  //authorsList.innerHTML = allAuthorsHTML;
  /* opcja z szablonem: */
  authorsList.innerHTML = templates.tagCloudAuthor(allAuthorsData);
  console.log(authorsList);
}
generateAuthors();

function authorClickHandler(event) {
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
  for (let activeAuthorsLink of activeAuthorsLinks) {
    /* remove class active */
    activeAuthorsLink.classList.remove('active');
    //end LOOP//
  }
  /* find all author links with "href" attribute equal to the "href" constant */
  const allAuthorsLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(allAuthorsLinks);
  /* START LOOP: for each found author link */
  for (let allAuthorsLink of allAuthorsLinks) {
    /* add class active */
    allAuthorsLink.classList.add('active');
    //end LOOP//
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  /* find all links to authors */
  const allLinksToAuthors = document.querySelectorAll('a[href^="#author-"]');
  console.log(allLinksToAuthors);
  /* START LOOP: for each link */
  for (let allLinksToAuthor of allLinksToAuthors) {
    /* add tagClickHandler as event listener for that link */
    allLinksToAuthor.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();
