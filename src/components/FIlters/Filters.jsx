import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Grid,
  Paper,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  ListItemText,
  CircularProgress,
  Autocomplete,
} from "@mui/material";

const Filters = ({
  config = [],
  initialValues = {},
  onApply,
  onReset,
  loading = false,
  apiHeaders = {},
}) => {
  const [filterValues, setFilterValues] = useState(initialValues);
  const [optionsData, setOptionsData] = useState({});
  const [fetchingOptions, setFetchingOptions] = useState({});

  const formatFilterValue = (value, fieldConfig) => {
    if (fieldConfig.multiple && Array.isArray(value)) {
      return value.join(",");
    }
    return value;
  };

  const handleSubmit = () => {
    const formattedFilters = {};

    config.forEach((field) => {
      const value = filterValues[field.name];
      if (value) {
        formattedFilters[field.name] = formatFilterValue(value, field);
      }
    });
    onApply(formattedFilters);
  };

  const fetchOptions = useCallback(
    async (url, name) => {
      try {
        setFetchingOptions((prev) => ({ ...prev, [name]: true }));
        const response = await fetch(url, {
          headers: {
            ...apiHeaders,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setOptionsData((prev) => ({
          ...prev,
          [name]: data.items || data,
        }));
      } catch (error) {
        console.error(`Error fetching options for ${name}:`, error);
      } finally {
        setFetchingOptions((prev) => ({ ...prev, [name]: false }));
      }
    },
    [apiHeaders]
  );
  const handleAutocompleteChange = (name, value) => {
    handleChange(name, value);
    fetchOptions(config.find((f) => f.name === name).optionsUrl, name, value);
  };
  useEffect(() => {
    config.forEach((field) => {
      if (
        field.type === "select" &&
        field.optionsUrl &&
        !optionsData[field.name] &&
        !fetchingOptions[field.name]
      ) {
        fetchOptions(field.optionsUrl, field.name);
      }
    });
  }, [config, fetchOptions, optionsData, fetchingOptions]);

  const handleChange = (name, value) => {
    setFilterValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFilterValues(initialValues);
    onReset();
  };

  const renderField = (field) => {
    switch (field.type) {
      case "text":
        return (
          <TextField
            fullWidth
            label={field.label}
            value={filterValues[field.name] || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            variant="outlined"
            size="small"
          />
        );

      case "select": {
        const options = field.options || optionsData[field.name] || [];
        return (
          <FormControl fullWidth size="small">
            <InputLabel>{field.label}</InputLabel>
            <Select
              multiple={field.multiple || false}
              label={field.label}
              value={filterValues[field.name] || (field.multiple ? [] : "")}
              onChange={(e) => handleChange(field.name, e.target.value)}
              renderValue={(selected) =>
                field.multiple ? selected.join(", ") : selected
              }
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 250,
                  },
                },
              }}
            >
              {options?.map((option, index) => {
                const value = option.value ?? option.name ?? option;
                const label = option.label ?? option.name ?? option;
                const isChecked =
                  filterValues[field.name]?.includes(value) || false;
                return (
                  <MenuItem
                    key={`${field.name}-${value}-${index}`}
                    value={value}
                  >
                    {field.multiple && <Checkbox checked={isChecked} />}
                    <ListItemText primary={label} />
                  </MenuItem>
                );
              })}
              {fetchingOptions[field.name] && (
                <MenuItem disabled>
                  <CircularProgress size={24} />
                </MenuItem>
              )}
            </Select>
          </FormControl>
        );
      }

      case "date":
        return (
          <TextField
            fullWidth
            label={field.label}
            type="date"
            InputLabelProps={{ shrink: true }}
            value={filterValues[field.name] || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            variant="outlined"
            size="small"
          />
        );
      case "time":
        return (
          <TextField
            fullWidth
            label={field.label}
            type="time"
            InputLabelProps={{ shrink: true }}
            value={filterValues[field.name] || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            variant="outlined"
            size="small"
          />
        );
      case "autocomplete":
        return (
          <Autocomplete
            fullWidth
            freeSolo
            options={optionsData[field.name] || []}
            getOptionLabel={(option) => option.label || option.name || option}
            getOptionKey={(option) =>
              option.id || option.value || option.name || JSON.stringify(option)
            }
            value={filterValues[field.name] || ""}
            onInputChange={(_, value) =>
              handleAutocompleteChange(field.name, value)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={field.label}
                variant="outlined"
                size="small"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {fetchingOptions[field.name] ? (
                        <CircularProgress size={24} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Grid container spacing={2}>
        {config.map((field, index) => (
          <Grid item xs={12} sm={field.breakpoints || 4} key={index}>
            {renderField(field)}
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 2, display: "flex", gap: 2, justifyContent: "center" }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#00A8c6", color: "white" }}
          onClick={handleSubmit}
          disabled={loading}
        >
          Apply
        </Button>
        <Button
          variant="outlined"
          onClick={handleReset}
          sx={{ mr: 1, backgroundColor: "#6b6b6b", color: "white" }}
          disabled={loading}
        >
          Reset
        </Button>
      </Box>
    </Paper>
  );
};

export default Filters;
