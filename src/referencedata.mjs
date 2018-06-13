import * as ReferenceDataClass from './refData';
import ManifestClass from './manifest.mjs';

import * as TrainOperatingCompanyClass from './models/trainOperatingCompany';
import * as LateRunningReasonClass from './models/lateRunningReason';
import * as CancellationReasonClass from './models/cancellationReason';

export const referenceData = new ReferenceDataClass();

export const ReferenceData = ReferenceDataClass;
export const Manifest = ManifestClass;

export const TrainOperatingCompany = TrainOperatingCompanyClass;
export const LateRunningReason = LateRunningReasonClass;
export const CancellationReason = CancellationReasonClass;
