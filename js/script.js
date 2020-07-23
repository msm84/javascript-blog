'use strict';

function titleClickHandler(event) {
    console.log('Link was clicked!');
    event.preventDefault(); //blokowanie domyślnej akcji//
    const clickedElement = this;
    console.log(event);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .active');

    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link / z klikniętego linka weź zawartość atrybutu href, np. #article-2*/

    const articleSelector = clickedElement.getAttribute("href");
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
    optTitleListSelector = '.titles';

function generateTitleLinks() {

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);

    let html = ''; //deklarujemy zmienną html do której będziemy doklejać linki//

    for (let article of articles) {
        console.log(article);
        const articleId = article.getAttribute("id"); /* get the article id */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML; /* find the title element  and get the title from the title element */
        const linkHTML = '<li><a href="#' + articleId + '><span>' + articleTitle + '</span></a></li>'; /* create HTML of the link */
        console.log(linkHTML);
        html = html + linkHTML /* insert link into html variable */
        console.log(html);
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log(links);

    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }

}

generateTitleLinks();