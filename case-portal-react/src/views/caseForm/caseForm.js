import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { TransitionProps } from '@mui/material/transitions';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { Form } from '@formio/react';
import { TaskList } from '../taskList/taskList';

import { CaseStatus } from 'common/caseStatus';

import { Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import { Comments } from 'views/caseComment/Comments';

import { QuestionCircleOutlined } from '@ant-design/icons';

import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';

import { tryParseJSONObject } from '../../utils/jsonStringCheck';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import { FilePdfOutlined, FileExcelOutlined, FileOutlined } from '@ant-design/icons';

import { CaseEmailsList } from 'views/caseEmail/caseEmailList';

import FileBase64 from 'react-file-base64';

import { useTranslation } from 'react-i18next';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};

export const CaseForm = ({ open, handleClose, aCase, keycloak }) => {
    const [caseDef, setCaseDef] = useState(null);
    const [form, setForm] = useState(null);
    const [formData, setFormData] = useState(null);

    const [tabIndex, setTabIndex] = useState(0);

    const [activeStage, setActiveStage] = React.useState(0);
    const [stages, setStages] = useState([]);

    const { t } = useTranslation();

    useEffect(() => {
        getCaseInfo(aCase, open)
    }, [open, aCase]);

    const getCaseInfo = (aCase, open) => {
        fetch(process.env.REACT_APP_API_URL + '/case-definition/' + aCase.caseDefinitionId)
            .then((response) => response.json())
            .then((data) => {
                setCaseDef(data);
                setStages(data.stages.sort((a, b) => a.index - b.index).map((o) => o.name));
                return fetch(process.env.REACT_APP_API_URL + '/form/' + data.formKey);
            })
            .then((response) => response.json())
            .then((data) => {
                setForm(data);
                return fetch(process.env.REACT_APP_API_URL + '/case/' + aCase.businessKey);
            })
            .then((response) => response.json())
            .then((caseData) => {
                setFormData({
                    data: caseData.attributes.reduce(
                        (obj, item) =>
                            Object.assign(obj, {
                                [item.name]: tryParseJSONObject(item.value) ? JSON.parse(item.value) : item.value
                            }),
                        {}
                    ),
                    metadata: {},
                    isValid: true
                });
                setActiveStage(caseData.stage);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    const handleTabChanged = (event, newValue) => {
        setTabIndex(newValue);
    };

    const handleUpdateCaseStatus = (newStatus) => {
        fetch(process.env.REACT_APP_API_URL + '/case/' + aCase.businessKey, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                businessKey: caseDef.id,
                status: newStatus
            })
        })
            .then((response) => {
                handleClose();
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    return (
        aCase &&
        caseDef &&
        form &&
        formData && (
            <div>
                <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} component="div">
                                <div>{caseDef.name}: {aCase?.businessKey}</div>
                                <div style={{ fontSize: '13px' }}>{aCase?.statusDescription}</div>
                            </Typography>
                            {aCase.status === CaseStatus.WipCaseStatus.description && (
                                <Button color="inherit" onClick={() => handleUpdateCaseStatus(CaseStatus.ClosedCaseStatus.description)}>
                                    {t('pages.caseform.actions.close')}
                                </Button>
                            )}
                            {aCase.status === CaseStatus.ClosedCaseStatus.description && (
                                <React.Fragment>
                                    <Button color="inherit" onClick={() => handleUpdateCaseStatus(CaseStatus.WipCaseStatus.description)}>
                                    {t('pages.caseform.actions.reopen')}
                                    </Button>

                                    <Button
                                        color="inherit"
                                        onClick={() => handleUpdateCaseStatus(CaseStatus.ArchivedCaseStatus.description)}
                                    >
                                        {t('pages.caseform.actions.archive')}
                                    </Button>
                                </React.Fragment>
                            )}
                            {aCase.status === CaseStatus.ArchivedCaseStatus.description && (
                                <React.Fragment>
                                    <Button color="inherit" onClick={() => handleUpdateCaseStatus(CaseStatus.WipCaseStatus.description)}>
                                    {t('pages.caseform.actions.reopen')}
                                    </Button>
                                </React.Fragment>
                            )}
                        </Toolbar>
                    </AppBar>

                    <Box sx={{ pl: 10, pr: 10, pt: 2, pb: 2, borderBottom: 1, borderColor: 'divider' }}>
                        <Stepper
                            activeStep={stages.findIndex((o) => {
                                return o === activeStage;
                            })}
                        >
                            {stages.map((label, index) => {
                                const stagesProps = {};
                                const labelProps = {};
                                return (
                                    <Step key={label} {...stagesProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                    </Box>

                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tabIndex} onChange={handleTabChanged} aria-label="basic tabs example">
                            <Tab label={t('pages.caseform.tabs.details')} {...a11yProps(0)} />
                            <Tab label={t('pages.caseform.tabs.tasks')} {...a11yProps(1)} />
                            <Tab label={t('pages.caseform.tabs.comments')} {...a11yProps(2)} />
                            <Tab label={t('pages.caseform.tabs.attachments')} {...a11yProps(3)} />
                            <Tab label={t('pages.caseform.tabs.emails')} {...a11yProps(4)} />
                            
                        </Tabs>
                    </Box>

                    <TabPanel value={tabIndex} index={0}>
                        {/* Case Details  */}
                        <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Grid item xs={12}>
                                <MainCard sx={{ p: 2 }} content={false}>
                                    <Box sx={{ pb: 1, display: 'flex', flexDirection: 'row' }}>
                                        <Typography variant="h5" color="textSecondary" sx={{ pr: 0.5 }}>
                                            {form.title}
                                        </Typography>
                                        <Tooltip title={form.toolTip}>
                                            <QuestionCircleOutlined />
                                        </Tooltip>
                                    </Box>
                                    <Form form={form.structure} submission={formData} options={{ readOnly: true }} />
                                </MainCard>
                            </Grid>
                        </Grid>
                    </TabPanel>

                    <TabPanel value={tabIndex} index={1}>
                        <div style={{ display: 'grid', padding: '10px' }}>
                            <TaskList businessKey={aCase.businessKey} bpmEngineId={caseDef.bpmEngineId} keycloak={keycloak} />
                        </div>
                    </TabPanel>

                    <TabPanel value={tabIndex} index={2}>
                          <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Grid item xs={12}>
                                <Comments commentsUrl="http://localhost:3004/comments" currentUserId="1" />
                            </Grid>
                        </Grid>
                    </TabPanel>

                    <TabPanel value={tabIndex} index={3}>
                        <Attachments data={formData.data} aCase={aCase} getCaseInfo={getCaseInfo} />
                    </TabPanel>

                    <TabPanel value={tabIndex} index={4}>
                        <CaseEmailsList caseInstanceBusinessKey={aCase.businessKey}/>
                    </TabPanel>

                </Dialog>
            </div>
        )
    );
};

const downloadFile = async (fileToDownload) => {
    const file = await createBlob(fileToDownload.url);
    
    const element = document.createElement("a");
    
    element.href = URL.createObjectURL(file);
    
    element.download = fileToDownload.originalName;
    
    document.body.appendChild(element); 
    
    element.click();
}

async function createBlob(base64) {
    let res = await fetch(base64)
    let myBlob = await res.blob()
  
    return myBlob;
} 

const handleFileChange = (files, aCase, getCaseInfo) => {
    if (!files) {
      return;
    }

    const attachments = [];

    files.forEach((file, i) => {
        attachments.push({...file});
    });

    fetch(process.env.REACT_APP_API_URL + '/case/upload/' + aCase.businessKey, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify(attachments),
    })
      .then((data) => {
        getCaseInfo(aCase, true);
    })
      .catch((err) => console.error(err));
  };

function Attachments({data, aCase, getCaseInfo}) {
    return (
        <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Grid item xs={12}>
                <MainCard sx={{ mb: 1 }}>
                    <Box sx={{ border: '1px dashed #d9d9d9', padding: 5 }}>
                        <Grid container direction="column" justifyContent="center" alignItems="center">
                            <Avatar style={{ backgroundColor: '#27CDF2', fontSize: 40, height: 60, width: 60, opacity: 0.5 }}>
                                <FilePdfOutlined />
                            </Avatar>

                            <br/>

                            <Typography variant="h4" color="textSecondary" sx={{ pr: 0.5 }}>
                                Select files to upload
                            </Typography>
                            
                            <br />
                            
                            <FileBase64
                                multiple={ true }
                                onDone={ async (files) => {
                                    await handleFileChange(files, aCase, getCaseInfo); 
                                }} />

                        </Grid>
                    </Box>

                    <div  style={{ paddingTop: 15 }}>
                        <hr/>
                    </div>

                    {data.file?.length === 0 && 
                     <Typography variant="h4" color="textSecondary" sx={{ pr: 0.5 }}>
                        Attach your files and they will be shown here
                     </Typography>
                    }

                    {data.file?.length !== 0 && 
                        <List>
                            {data.file && data.file.map((file, index) => {
                                return (
                                    <ListItem key={index}>
                                        <ListItemAvatar>
                                            <Avatar style={{ backgroundColor: 'red' }}>
                                                {file.type === "application/pdf" && 
                                                    <FilePdfOutlined />
                                                }

                                                {file.type === "application/xls" && 
                                                    <FileExcelOutlined />
                                                }

                                                {file.type !== "application/xls" && file.type !== "application/pdf" && 
                                                    <FileOutlined />
                                                }
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={file.originalName} secondary={file.size + "KB"} style={{maxWidth: "80%"}} /> 
                                        <ListItemButton style={{maxWidth: "10%"}}
                                            component="button"
                                            onClick={() => downloadFile(file)}>
                                            <ListItemText primary="Download" />
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })}
                        </List>
                    }

                </MainCard>
            </Grid>
        </Grid>
    );
}
