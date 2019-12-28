import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles(theme => ({
  container: {
    border: '8px dashed #d6d6d6',
    borderRadius: 4,
  },
  buttonAdd: {
    borderRadius: 5,
    marginTop: 40,
    marginBottom: 40,
  },
  buttonDelete: {
    position: 'absolute',
    width: 40,
    height: 30,
    margin: 5,
    color: 'red',
  },
}));

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  margin: 16,
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 150,
  height: 150,
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

const Previews = ({files, deleteImageProduct, addImagesProduct}) => {
  const classes = useStyles();

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/jpeg, image/png',
    maxSize: 1048576,
    onDrop: acceptedFiles => {
      if (files.length + acceptedFiles.length > 4) {
        alert("le nombre d'image est de 4 max frere");
        return;
      }
      addImagesProduct(acceptedFiles);
    },
  });

  const thumbs = files.map(file => (
    <div style={thumb} key={file.filename}>
      <div style={thumbInner}>
        <Fab aria-label="delete" className={classes.buttonDelete}>
          <DeleteIcon onClick={() => deleteImageProduct(file)} />
        </Fab>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <div>
      <p>Ajouter des photos ( 4 max )</p>
      <section className={classes.container}>
        <Grid container spacing={3}>
          <Grid item>
            <aside style={thumbsContainer}>
              {thumbs}
              <div {...getRootProps({className: 'thumbsContainer'})}>
                <input {...getInputProps()} />
                <Fab
                  color="primary"
                  aria-label="add"
                  className={classes.buttonAdd}
                >
                  <AddIcon />
                </Fab>
              </div>
            </aside>
          </Grid>
        </Grid>
      </section>
    </div>
  );
};

export default Previews;
