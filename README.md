# HDB Resale Flat Price Analysis & Web Application

## Overview
This project explores HDB resale flat prices in Singapore by combining database design, SQL analysis, and web development. It analyzes housing trends such as resale prices across towns, flat types, storey ranges, and lease years using structured data.

## Dataset
- Source: data.gov.sg (HDB Resale Flat Prices)  
- Data from January 2017 onward  
- Includes:
  - Town, block, flat type  
  - Floor area, storey range  
  - Lease commencement year  
  - Resale price  

## System Design
- Relational database with normalized tables:
  - Town  
  - Block  
  - Flat  
  - Transaction  
- Designed using ER diagrams and normalization (up to BCNF)  

## Key Features
- Data preprocessing using a staging table  
- SQL queries to analyze housing trends  
- Backend server with Node.js and Express  
- Dynamic web interface using EJS templates  

## Analysis Performed
- Top towns by average resale price (4-room flats)  
- Price trends over time by flat type  
- Impact of lease commencement year on price  
- Relationship between storey range and resale value  
- Most frequently transacted flat types by town  

## Insights
- Newer flats generally have higher resale value  
- Higher floors tend to command higher prices  
- Price trends vary across towns and flat types  
- SQL enables efficient exploration of large datasets  

## Tech Stack
- SQL (MySQL)  
- Node.js, Express  
- EJS  
- JavaScript  

## Run
```bash
npm install
node app.js
