import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, ButtonGroup, Container, Dialog, DialogTitle, Grid, IconButton, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import { get } from '../service/api/jasonplaceholder/toDos';
import axios from 'axios';




const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[600],
    color: theme.palette.common.white,
    fontSize: 15,
    paddingLeft: 16
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 23,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.focus,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface IRecado{

  id: string;
  titulo: string;
  descricao: string;
  status: boolean;

}



export default function Tabela() {

  const [lista, setLista] = useState([]);
  const [modalNovo, setModalNovo] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalArquivados, setModalArquivados] = useState(false);

  const [id, setId] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [statusRecadoF, setStatus] = useState(false);


  const listar = () => {

    const resultado = get('/all').then((response) => {
      setLista(response);
      
    })



    }


  const arquivarRecado = (row: any) => {
    setStatus(!statusRecadoF);
    axios.put(`https://api-back-end-at-final.herokuapp.com/sistema/recado/${id}`,{
      id: row.id,
      titulo: row.titulo,
      descricao: row.descricao,
      statusRecado : !row.statusRecado
    })
      .then(function (response) {
        console.log(response);
        console.log("O status que ta retornando é" ,statusRecadoF);
        listar();

      })
      .catch(function (error) {
        console.log(error);
      });

     
    listar();
  }

  const salvarRecado = () => {

    axios.post('https://api-back-end-at-final.herokuapp.com/sistema/recado', {

      titulo: titulo,
      descricao: descricao
    })
      .then(function (response) {
        alert('Recado criado com sucesso!')
        listar();
      })
      .catch(function (error) {
        console.log(error);
      });
      setModalNovo(false);
      
  }

  function editarRecado(id: string, titulo: string, descricao: string) {

    setId(id);
    setTitulo(titulo);
    setDescricao(descricao);
    setModalEditar(true);

  }

  function salvarRecadoEditado() {
    axios.put(`https://api-back-end-at-final.herokuapp.com/sistema/recado/${id}`, {
      id: id,
      titulo: titulo,
      descricao: descricao,
      statusRecado: statusRecadoF
    })
      .then(function (response) {
        console.log(response);
        listar();

      })
      .catch(function (error) {
        console.log(error);
      });

      setModalEditar(false);
  }

  function apagarRecado(id: string) {
    axios.delete(`https://api-back-end-at-final.herokuapp.com/sistema/recado/${id}`, {}
    ).then(function (response) {
        console.log(response);
        listar();

      })
      .catch(function (error) {
        console.log(error);
      });
  }






  useEffect(() => {

    listar();


  }, []);



  return (
    <>
      <Grid container>
        <Grid item xs={12} >
          <Container sx={{ mt: 7 }}>
            <Button variant='contained' sx= {{mb: 2 , position: "relative" , left: "70%"}} onClick={() => setModalNovo(true)}> NOVO RECADO</Button>
            <Button sx={{ mb: 2 }} onClick={()=> setModalArquivados(true)}><ArchiveIcon/> Recados Arquivados</Button>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>#ID</StyledTableCell>
                    <StyledTableCell align="center" >TÍTULO</StyledTableCell>
                    <StyledTableCell align="center">DESCRIÇÃO</StyledTableCell>
                    <StyledTableCell align="center">AÇÕES</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {lista.map((row: any) => (
                    <StyledTableRow >
                      <StyledTableCell >
                        <Typography variant='h5'><b>{row.id}</b></Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.titulo}</StyledTableCell>
                      <StyledTableCell align="center">{row.descricao}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Stack direction='row' spacing={2} >
                        <ButtonGroup sx={{position: "relative" , left: "30%"}} variant="text" aria-label="text button group">
                          <Button>
                            <IconButton onClick={() => apagarRecado(row.id)}>
                              <DeleteForeverIcon sx={{ fontSize: 35 }} />
                            </IconButton>
                          </Button>
                          <Button>
                            <IconButton onClick={() => editarRecado(row.id, row.titulo, row.descricao)}>
                              <EditIcon sx={{ fontSize: 35 }} />
                            </IconButton>
                          </Button>
                          <Button>
                            <IconButton onClick={() => arquivarRecado(row)}>
                              <ArchiveIcon sx={{ fontSize: 35 }} />
                            </IconButton>
                          </Button>
                        </ButtonGroup>
                        </Stack>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}




                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Grid>
      </Grid>


      {/* MODAL NOVO RECADO */}
      <Dialog open={modalNovo}>
        <DialogTitle alignSelf={"center"}>Novo recado</DialogTitle>
        <Container>
          <Typography variant='subtitle1'>Titulo</Typography>
          <TextField onChange={(e) => setTitulo(e.target.value)} />
          <Typography variant='subtitle1'>Descricao</Typography>
          <TextField onChange={(e) => setDescricao(e.target.value)} />
          <Container sx={{ mt: 2 }}>
            <Stack sx={{pb: 2}} direction="row" spacing={2}>
              <Button variant="contained" onClick={() => salvarRecado()}>Salvar</Button>
              <Button variant="outlined" onClick={() => setModalNovo(false)}>Cancelar</Button>
            </Stack>
          </Container>
        </Container>
      </Dialog>
      {/* Final modal nov recacado */}


      {/* MODAL Editar */}
      <Dialog open={modalEditar}>
        <DialogTitle>Editar Recado</DialogTitle>
        <Container>
          <Typography variant='subtitle1'>Titulo</Typography>
          <TextField value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          <Typography variant='subtitle1'>Descricao</Typography>
          <TextField value={descricao} onChange={(e) => setDescricao(e.target.value)} />
          <Container sx={{ mt: 2 }}>
            <Stack sx={{pb: 2}} direction="row" spacing={2}>
              <Button variant="contained" onClick={() => salvarRecadoEditado()} > Salvar</Button>
              <Button variant="outlined" onClick={() => setModalEditar(false)}>Cancelar</Button>
            </Stack>
          </Container>
        </Container>
      </Dialog>
      {/* Final ediatr */}

            {/* MODAL RECADOS ARQUIVADOS */}
      <Dialog open={modalArquivados}>
        <DialogTitle>Recados Arquivados</DialogTitle>
        <Container>
          <Typography variant='subtitle1'>Titulo</Typography>
          <TextField value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          <Typography variant='subtitle1'>Descricao</Typography>
          <TextField value={descricao} onChange={(e) => setDescricao(e.target.value)} />
          <Container sx={{ mt: 2 }}>
            <Stack sx={{pb: 2}} direction="row" spacing={2}>
              <Button variant="contained" onClick={() => salvarRecadoEditado()} > Salvar</Button>
              <Button variant="outlined" onClick={() => setModalArquivados(false)}>Cancelar</Button>
            </Stack>
          </Container>
        </Container>
      </Dialog>
      {/* Final ediatr */}

    </>


  );
}