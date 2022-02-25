module.exports = (sequelize, Sequelize) => {
	const Canvas = sequelize.define('Canvas', {
 
     
data:{
    type: Sequelize.STRING,
},
 
createdAt:{
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
},
updatedAt:{
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
}
});

return Canvas;
}