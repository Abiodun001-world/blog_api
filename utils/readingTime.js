module.exports = (body) => {
    const wordsPerMinute = 200; // Average reading speed
    const words = body.split(" ").length;
    return `${Math.ceil(words / wordsPerMinute)} min read`;
  };
  