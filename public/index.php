<?php
  require_once __DIR__ . '/../vendor/autoload.php';

  const PRERENDER_URL = 'http://localhost:3000';
  const SHOP_URL = 'http://shop.junimed.ua';
  const SHOP_API_URL = 'http://api.shop.junimed.ua';
  $crawlerDetect = new \Jaybizzle\CrawlerDetect\CrawlerDetect();

  /** Return static content for crawlers */
  if (!preg_match('/(PhantomJS|Prerender)/', $_SERVER['HTTP_USER_AGENT']) && $crawlerDetect->isCrawler()) {
    echo file_get_contents(PRERENDER_URL . '/' . SHOP_URL . $_SERVER['REQUEST_URI']);
    exit;
  }

  /** Get metatags data */
  $metaTags = file_get_contents(SHOP_API_URL . '/store/seo/meta-tags?path=' . $_SERVER['REQUEST_URI']);

  /** Get main page layout */
  $layout = file_get_contents(__DIR__ . '/index.html');

  echo str_replace('<metatags></metatags>' , $metaTags, $layout);
