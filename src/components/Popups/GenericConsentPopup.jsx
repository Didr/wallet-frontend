import React, { useEffect, useCallback } from 'react';
import PopupLayout from './PopupLayout';
import { useTranslation } from 'react-i18next';
import Button from '../Buttons/Button';
import useScreenType from '../../hooks/useScreenType';

function GenericConsentPopup({ popupConsentState, setPopupConsentState, showConsentPopup, hidePopupConsent }) {
	const { t } = useTranslation();

	const screenType = useScreenType();

	const reinitialize = useCallback(() => {
		setPopupConsentState((current) => ({ ...current, isOpen: false }));
	}, [setPopupConsentState]);


	useEffect(() => {
		if (popupConsentState?.options) {
		}
	}, [popupConsentState]);


	const consent = () => {
		reinitialize();
		popupConsentState.resolve(true);
	}

	const onClose = () => {
		// setIsOpen(false);
		popupConsentState.resolve(false);
		reinitialize();
		// navigate('/');
	}

	if (!popupConsentState?.isOpen) {
		return null;
	};



	return (
		<PopupLayout isOpen={popupConsentState?.isOpen} onClose={onClose} loading={false} fullScreen={screenType !== 'desktop'}>
			<div className={`${screenType !== 'desktop' && 'pb-16'}`}>
				<div>
					{popupConsentState?.options?.title ? <h2 className="text-lg font-bold mb-2 text-primary dark:text-white">{popupConsentState?.options?.title}</h2> : <></> }
					<hr className="mb-2 border-t border-primary/80 dark:border-white/80" />

					{popupConsentState?.options ? popupConsentState?.options?.attestations.map((a) => {
						return (<>
						<h4 className="text-lg font-bold mb-2 text-primary dark:text-white">{a.heading}</h4>
						<p className="text-gray-700 italic dark:text-white text-sm mt-2 mb-4">{a.text}</p>
					</>)
					}): <></>}
				</div>

				<div className={`flex justify-between pt-4 z-10 ${screenType !== 'desktop' && 'fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 flex px-6 pb-6 flex shadow-2xl rounded-t-lg w-auto'}`}>
					<Button
						id="cancel-select-credentials"
						onClick={onClose}
						variant="cancel"
						className="mr-2"
					>
						{t('common.cancel')}
					</Button>

					<div className="flex gap-2">
						<Button
							id="consent"
							variant="secondary"
							onClick={consent}>
							{t('common.navItemSendCredentialsSimple')}
						</Button>
					</div>
				</div>
			</div>

		</PopupLayout >
	);
}

export default GenericConsentPopup;
