import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Toggle } from 'react-powerplug';
import InputRange from 'react-input-range';
import { Plus, Minus, RefreshCcw, CheckCircle, Image } from 'react-feather';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import LabelOption from '../label-option/label-option.component';
import ColorPicker from '../color-picker/colorpicker.component';
import { toDataURL } from './background.util.ai';
import 'react-input-range/lib/css/index.css';
import './background-options-ai.styles.scss';

import { Configuration, OpenAIApi } from "openai";


const BackgroundOptionsAI = ({ handleChange, defaultSettings: { overlay, background }, changeSettings }) => {

	const [prompt, setPrompt] = useState("");
	const [result, setResult] = useState("");
	const [loadings, setLoading] = useState(false);
	const [placeholder, setPlaceholder] = useState(
	  "Write your imagination to create a background with AI"
	);

	const configuration = new Configuration({
	  apiKey: process.env.REACT_APP_API_KEY,
	  //apiKey: "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",

	});
  
	const openai = new OpenAIApi(configuration);
	console.log(openai);

	const generateImage = async () => {
		setPlaceholder(`Search ${prompt}..`);
		setLoading(true);
		const res = await openai.createImage({
		  prompt: prompt,
		  n: 1,
		  size: "512x512",
		});
		setLoading(false);
		setResult(res.data.data[0].url);
	  };

	const [imageUrl, setImageUrl] = useState('https://source.unsplash.com/random/720x720?magazine');
	const [overlays, setOverlay] = useState(overlay);

	const [category, setCategory] = useState('programming');
	const [loading, setImageLoaded] = useState(true);

	const changeImageUrl = () => {
		toDataURL(imageUrl, function (dataUrl) {
			if (dataUrl) changeSettings('bgUrl', dataUrl);
		});
	};

	const refreshImage = () =>
		setImageUrl(`https://source.unsplash.com/random/1280x807?${category}&time=${Math.random()}`);

	const changeCategory = (cat) => {
		setCategory(cat);
		refreshImage();
	};

	const imageLoaded = () => setImageLoaded(false);

	const CategoryButton = ({ name, slug }) => {
		return (
			<button className="default-btn" onClick={() => changeCategory(slug)}>
				<span>{name}</span>
			</button>
		);
	};

	return (
		
		<Toggle initial={false}>
			{({ on, toggle }) => (
				<>
					<div className="toggle" onClick={toggle} checked={on}>
						<h5>
							{on ? <Minus size="12" /> : <Plus size="12" />} <Image size="12" /> AI-Generated Background
						</h5>
					</div>
					{on && (
						
						
						<div className="options-toggle">

{/* 							<LabelOption name="Background">
								<ColorPicker
									defaultValue={background}
									changeSettings={changeSettings}
									name="background"
								/>
							</LabelOption> */}



							<div className="app-main">
				{loadings ? (
						<>
						<h5>Please Wait.. Building Your Imagination...</h5>
						<div className="lds-ripple">
							<div></div>
							<div></div>
						</div>
						</>
				) : (
					<>
					<textarea
						className="app-input"
						placeholder={placeholder}
						onChange={(e) => setPrompt(e.target.value)}
						rows="10"
						cols="40"
					/>
					<button className="default-btn" onClick={generateImage}>Generate Background Image</button>
					{result.length > 0 ? (
						 //<img className="result-image" src={result} alt="result" />
						setImageUrl(result)
						
						//this.changeImageUrl()
						
						

					) : (
						<></>
					)}
					</>
				)}
				</div>


{/* repeat block */}

							<div>

							<div>
							<span></span>
							<img src={imageUrl} alt="Programming" height="256px" width="256" />
							</div>
							

								<div className="d-f j-sb">
									<button className="default-btn" onClick={changeImageUrl}>
										<span>Use This Image</span>
									</button>
								</div>

							</div> 





{/* 							<div>
								<h5>Background Image URL</h5>
								<input
									type="url"
									placeholder="Background Image URL"
									onChange={(e) => {
										toDataURL(e.target.value, function (dataUrl) {
											if (dataUrl) changeSettings('bgUrl', dataUrl);
										});
									}}
									name="bgUrl"
								/>
							</div> */}


							{/* <div>
								<div className="d-f j-sb">
									<button className="default-btn" onClick={refreshImage}>
										<RefreshCcw size="12" />
										<span>Try Another</span>
									</button>
									<button className="default-btn" onClick={changeImageUrl}>
										<CheckCircle size="12" />
										<span>Use This Image</span>
									</button>
								</div>
								<LazyLoadImage
									alt="Programming"
									height="150px"
									afterLoad={imageLoaded}
									onClick={changeImageUrl}
									src={imageUrl} // use normal <img> attributes as props
									width="265px"
								/>
								{loading && <span className="loading-text">Loading...</span>}

								<div className="d-f center">
									<CategoryButton name="Programming" slug="programming" />
									<CategoryButton name="Business" slug="business-work" />
									<CategoryButton name="Nature" slug="nature" />
									<CategoryButton name="Laptop" slug="mac" />
								</div>
							</div> */}




							<div>
								<h5>Darken Background</h5>
								<InputRange
									className="slider"
									maxValue={1}
									formatLabel={(value) => ''}
									step={0.1}
									minValue={0}
									value={overlays}
									onChange={(value) => {
										setOverlay(value);
										changeSettings('overlay', value);
									}}
								/>
							</div>
						</div>
					)}
				</>
			)}
		</Toggle>
	);
};

BackgroundOptionsAI.propTypes = {
	handleChange: PropTypes.func,
	defaultSettings: PropTypes.object,
	changeSettings: PropTypes.func,
};

export default BackgroundOptionsAI;
