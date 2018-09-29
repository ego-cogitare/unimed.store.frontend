<?php
  require_once __DIR__ . '/../vendor/autoload.php';

  const PRERENDER_URL = 'http://localhost:3000';
  const SHOP_URL = 'http://shop.junimed.ua';
  $crawlerDetect = new \Jaybizzle\CrawlerDetect\CrawlerDetect();

  /** Return static content for crawlers */
  if (!preg_match('/(PhantomJS|Prerender)/', $_SERVER['HTTP_USER_AGENT']) && $crawlerDetect->isCrawler()) {
    $curl = curl_init();
    curl_setopt_array($curl, array(
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_URL => PRERENDER_URL . '/' . SHOP_URL . $_SERVER['REQUEST_URI'],
    ));
    echo curl_exec($curl);
    exit;
  }

  require_once __DIR__ . '/index.html';
