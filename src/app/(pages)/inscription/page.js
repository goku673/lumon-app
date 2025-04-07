"use client";
import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Grid,
  Box,
  Typography,
  Paper,
  FormHelperText,
  Tabs,
  Tab,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveIcon from "@mui/icons-material/Save";

// Custom Input
const CustomTextField = ({ label, ...props }) => (
  <Box sx={{ mt: 2, mb: 2 }}>
    <Typography variant="subtitle1" sx={{ mb: 1 }}>
      {label}
    </Typography>
    <TextField fullWidth variant="outlined" size="small" {...props} />
  </Box>
);

// Custom Menú Seleccion
const CustomSelect = ({ label, children, ...props }) => (
  <Box sx={{ mt: 2, mb: 2 }}>
    <Typography variant="subtitle1" sx={{ mb: 1 }}>
      {label}
    </Typography>
    <FormControl fullWidth size="small">
      <Select displayEmpty defaultValue="" {...props}>
        {children}
      </Select>
    </FormControl>
  </Box>
);

const NameFields = ({ title }) => (
  <Box>
    <Typography variant="subtitle1" sx={{ mb: 1 }}>
      {title}
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          placeholder="Apellido Paterno"
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          placeholder="Apellido Materno"
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          placeholder="Nombre(s)"
          variant="outlined"
          size="small"
        />
      </Grid>
    </Grid>
  </Box>
);

// TabPanel component to handle tab content
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`inscription-tabpanel-${index}`}
      aria-labelledby={`inscription-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Inscription = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="min-h-screen max-w-[1400px] mx-auto lg:px-16 bg-primary-600 p-8">
      <Typography variant="h4" align="center" color="white" sx={{ mb: 4 }}>
        Inscripción a las Olimpiadas
      </Typography>

      <Paper elevation={2} sx={{ mb: 4, borderRadius: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            "& .MuiTab-root": { py: 2 },
          }}
        >
          <Tab label="DATOS DEL COMPETIDOR" />
          <Tab label="DATOS DE PROFESOR/TUTOR (OPCIONAL)" />
        </Tabs>

        {/* Seccion Competidor */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <NameFields title="Nombre del Competidor:" />

            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <CustomTextField
                  label="Correo Electrónico:"
                  type="email"
                  placeholder="Ingrese un correo válido"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomTextField
                  label="Cédula Identidad:"
                  placeholder="Ingrese CI"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomTextField
                  label="Fecha de nacimiento:"
                  placeholder="Ejemplo: 10/02/2024"
                  InputProps={{
                    inputProps: { pattern: "\\d{2}/\\d{2}/\\d{4}" },
                  }}
                />
              </Grid>
            </Grid>

            <CustomTextField
              label="Colegio:"
              placeholder="Ingrese el Nombre de Su Colegio"
            />

            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <CustomSelect label="Curso:">
                  <MenuItem value="">
                    <em>Seleccione el curso</em>
                  </MenuItem>
                  <MenuItem value="1">1ro Secundaria</MenuItem>
                  <MenuItem value="2">2do Secundaria</MenuItem>
                  <MenuItem value="3">3ro Secundaria</MenuItem>
                  <MenuItem value="4">4to Secundaria</MenuItem>
                  <MenuItem value="5">5to Secundaria</MenuItem>
                  <MenuItem value="6">6to Secundaria</MenuItem>
                </CustomSelect>
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomSelect label="Departamento:">
                  <MenuItem value="">
                    <em>Seleccione el departamento</em>
                  </MenuItem>
                  <MenuItem value="LP">La Paz</MenuItem>
                  <MenuItem value="CB">Cochabamba</MenuItem>
                  <MenuItem value="SC">Santa Cruz</MenuItem>
                  <MenuItem value="OR">Oruro</MenuItem>
                  <MenuItem value="PT">Potosí</MenuItem>
                  <MenuItem value="CH">Chuquisaca</MenuItem>
                  <MenuItem value="TJ">Tarija</MenuItem>
                  <MenuItem value="BE">Beni</MenuItem>
                  <MenuItem value="PD">Pando</MenuItem>
                </CustomSelect>
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomSelect label="Provincia:">
                  <MenuItem value="">
                    <em>Seleccione su provincia</em>
                  </MenuItem>
                  <MenuItem value="prov1">Provincia 1</MenuItem>
                  <MenuItem value="prov2">Provincia 2</MenuItem>
                  <MenuItem value="prov3">Provincia 3</MenuItem>
                </CustomSelect>
              </Grid>
            </Grid>

            <CustomSelect label="Área a la que se Inscribe:">
              <MenuItem value="">
                <em>Seleccione el área deseado</em>
              </MenuItem>
              <MenuItem value="matematica">Matemática</MenuItem>
              <MenuItem value="fisica">Física</MenuItem>
              <MenuItem value="quimica">Química</MenuItem>
              <MenuItem value="biologia">Biología</MenuItem>
              <MenuItem value="informatica">Informática</MenuItem>
            </CustomSelect>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                variant="contained"
                onClick={() => setTabValue(1)}
                sx={{ px: 4 }}
              >
                Siguiente
              </Button>
            </Box>
          </Box>
        </TabPanel>

        {/* Seccion Tutor */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Nombre del Profesor o Tutor:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    placeholder="Apellido Paterno"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    placeholder="Apellido Materno"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    placeholder="Nombre(s)"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Correo electrónico:
              </Typography>
              <TextField
                fullWidth
                type="email"
                placeholder="Ingrese un correo válido"
                variant="outlined"
                size="small"
              />
            </Box>

            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Celular:
              </Typography>
              <TextField
                fullWidth
                type="tel"
                placeholder="Ingrese un número válido"
                variant="outlined"
                size="small"
              />
            </Box>

            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Comprobante de pago:
              </Typography>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  bgcolor: "#f5f5f5",
                }}
              >
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                  sx={{ mb: 1 }}
                >
                  Subir archivo
                  <input type="file" hidden />
                </Button>
                <FormHelperText>
                  Formatos aceptados: PDF, JPG, PNG
                </FormHelperText>
              </Paper>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Button variant="outlined" onClick={() => setTabValue(0)}>
                Anterior
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                sx={{
                  bgcolor: "#e53e3e",
                  "&:hover": { bgcolor: "#c53030" },
                }}
              >
                Guardar los datos de inscripción
              </Button>
            </Box>
          </Box>
        </TabPanel>
      </Paper>
    </div>
  );
};

export default Inscription;
