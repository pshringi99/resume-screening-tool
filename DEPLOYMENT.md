# Deployment Guide

Your application is now configured as a unified Node.js app (Frontend + Backend). This makes it very easy to deploy to platforms like Render, Heroku, Railway, or Fly.io.

## Prerequisites
- A GitHub repository containing this project.
- An account on your chosen hosting provider.

## Option 1: Render (Recommended)
1.  **Create a New Web Service**:
    - Connect your GitHub repository.
2.  **Configure Settings**:
    - **Runtime**: Node
    - **Build Command**: `npm run build`
    - **Start Command**: `npm start`
3.  **Environment Variables**:
    - Add `GEMINI_API_KEY` (and any other variables from your `.env` file).
4.  **Deploy**: Click "Create Web Service".

## Option 2: Heroku
1.  **Install Heroku CLI** (if not installed).
2.  **Login**: `heroku login`
3.  **Create App**: `heroku create your-app-name`
4.  **Set Environment Variables**:
    ```bash
    heroku config:set GEMINI_API_KEY=your_key_here
    ```
5.  **Deploy**:
    ```bash
    git push heroku main
    ```

## Option 3: General Node.js Hosting
For any other provider, use the following settings:
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Environment Variables**: Ensure `GEMINI_API_KEY` is set.
- **Port**: The application listens on `process.env.PORT` (defaults to 3000). Most providers set this automatically.
