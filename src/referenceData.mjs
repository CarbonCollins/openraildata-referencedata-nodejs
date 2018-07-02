import { associationMixer, locationMixer, stationMixer, trainOrderMixer } from '@openrailuk/common';

import * as trainOperatingCompany from './models/trainOperatingCompany';
import * as customerInformationSystem from './models/customerInformationSystem';
import * as lateRunningReason from './models/lateRunningReason';
import * as cancellationReason from './models/cancellationReason';

import * as manifest from './manifest';

import { refAssociationMixin } from './models/refAssociation';
import refLocationMixin from './models/refLocation';
import refStationMixin from './models/refStation';
import refTrainOrderMixin from './models/refTrainOrder';

import * as dataController from './dataController';

associationMixer(refAssociationMixin);
// locationMixer(refLocationMixin);
stationMixer(refStationMixin);
trainOrderMixer(refTrainOrderMixin);

export const referenceData = new dataController.DataController();

export const DataController = dataController.DataController;

export const TrainOperatingCompany = trainOperatingCompany.TrainOperatingCompany;
export const CustomerInformationSystem = customerInformationSystem.CustomerInformationSystem;
export const LateRunningReason = lateRunningReason.LateRunningReason;
export const CancellationReason = cancellationReason.CancellationReason;
export const Manifest = manifest.Manifest;
