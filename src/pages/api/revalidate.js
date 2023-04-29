export default async function handler(request, response) {
    // Check for secret to confirm this is a valid request
    if (request.query.secret !== process.env.MY_SECRET_TOKEN) {
      return response.status(401).json({ message: 'Invalid token' });
    }
   
    try {
      await response.revalidate('/');
      return response.json({ revalidated: true });
    } catch (err) {
      // If there was an error, Next.js will continue
      // to show the last successfully generated page
      return response.status(500).send('Error revalidating');
    }
  }