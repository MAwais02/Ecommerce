import React from 'react';

const AboutPage = () => {
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      textAlign: 'center',
      color: '#333',
    },
    section: {
      marginBottom: '30px',
    },
    paragraph: {
      lineHeight: '1.6',
      color: '#666',
    },
    list: {
      listStyleType: 'none',
      padding: 0,
    },
    listItem: {
      marginBottom: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>About Our E-commerce Store</h1>
      
      <section style={styles.section}>
        <h2>Our Story</h2>
        <p style={styles.paragraph}>
          Founded in 2020, our e-commerce store has been dedicated to providing high-quality products and exceptional customer service. We started as a small family business and have grown into a trusted online retailer, serving customers worldwide.
        </p>
      </section>
      
      <section style={styles.section}>
        <h2>Our Mission</h2>
        <p style={styles.paragraph}>
          Our mission is to offer a wide range of products at competitive prices while ensuring a seamless shopping experience for our customers. We strive to stay ahead of the latest trends and continuously improve our services.
        </p>
      </section>
      
      <section style={styles.section}>
        <h2>Why Choose Us?</h2>
        <ul style={styles.list}>
          {[
            'Wide selection of products',
            'Competitive prices',
            'Fast and reliable shipping',
            'Excellent customer support',
            '30-day money-back guarantee',
          ].map((item, index) => (
            <li key={index} style={styles.listItem}>
              • {item}
            </li>
          ))}
        </ul>
      </section>
      
      <section style={styles.section}>
        <h2>Contact Us</h2>
        <p style={styles.paragraph}>
          We'd love to hear from you! If you have any questions, concerns, or feedback, please don't hesitate to reach out to our customer support team at support@ourecommerce.com or call us at (555) 123-4567.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;