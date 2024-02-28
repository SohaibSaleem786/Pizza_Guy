// CategoryCard.jsx

import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { useTheme } from '../../../../ThemeContext';

const CategoryCard = ({ categoryId, handleCategoryClick, isSelected }) => {
  const [categoryData, setCategoryData] = useState(null);
  const { secondaryColor, apiLinks, primaryColor } = useTheme();

  

  return (
    <Card
      className={`hover-category ${isSelected ? 'selected-category' : ''}`}
      style={{
        backgroundColor: isSelected ? secondaryColor : primaryColor,
        color: isSelected ? primaryColor : secondaryColor,
        width: '115%',
        height: '45px',
        marginBottom: '5px',
      }}
      onClick={() => handleCategoryClick(categoryId.tctgid)}
    >
      <CardContent style={{ marginTop: '5%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Typography
          gutterBottom
          style={{
            fontSize: '12px',
            textAlign: 'center',
            fontWeight: 'bold',
            textDecoration: 'none',
          }}
        >
          {categoryId ? categoryId.tctgdsc || 'Loading...' : 'Loading...'}
        </Typography>
        
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
