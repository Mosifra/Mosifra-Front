import {h, Component} from 'preact';
import { useState } from 'preact/hooks';

import logovert from "/images/logoverttext.svg";
import logorouge from "/images/logorouge.svg";
import logojaune from "/images/logojaune.svg";
import logonoir from "/images/logonoir.svg";
import logotransparent from "/images/logo_transparent_notext.svg";
import logovert2 from "/images/logovert2.svg";
import logojaune2 from "/images/logojaune2.svg";
import logorouge2 from "/images/logorouge2.svg";
import logorouge3 from "/images/logorouge3.svg";
import logoarch from "/images/logoarch.svg";

export function Home() {

  const logos = {logovert, logorouge, logojaune, logonoir, logotransparent, logoarch, logojaune2, logovert2, logorouge2, logorouge3};
  const [selected, setSelected] = useState(logos.logovert)

	return (
		<div className="font-tenor">
		<div className="flex justify-center my-10 items-center">
			<img className="size-50" src={selected} />
		</div>
		<div className="flex justify-center items-center gap-4">
			<button onClick={() => setSelected(logos.logovert)} className="bg-[#B41C25] hover:bg-[#8F161E] text-white font-bold py-2 px-4 rounded">
			Logo vert 1
			</button>
			<button onClick={() => setSelected(logos.logovert2)} className="bg-[#B41C25] hover:bg-[#8F161E] text-white font-bold py-2 px-4 rounded">
			Logo vert 2
			</button>
			<button onClick={() => setSelected(logos.logorouge)} className="bg-[#B41C25] hover:bg-[#8F161E] text-white font-bold py-2 px-4 rounded">
			Logo rouge 1
			</button>
			<button onClick={() => setSelected(logos.logorouge2)} className="bg-[#B41C25] hover:bg-[#8F161E] text-white font-bold py-2 px-4 rounded">
			Logo rouge 2
			</button>
			<button onClick={() => setSelected(logos.logorouge3)} className="bg-[#B41C25] hover:bg-[#8F161E] text-white font-bold py-2 px-4 rounded">
			Logo rouge 3
			</button>
			<button onClick={() => setSelected(logos.logojaune)} className="bg-[#B41C25] hover:bg-[#8F161E] text-white font-bold py-2 px-4 rounded">
			Logo jaune
			</button>
			<button onClick={() => setSelected(logos.logojaune2)} className="bg-[#B41C25] hover:bg-[#8F161E] text-white font-bold py-2 px-4 rounded">
			Logo jaune 2
			</button>
			<button onClick={() => setSelected(logos.logonoir)} className="bg-[#B41C25] hover:bg-[#8F161E] text-white font-bold py-2 px-4 rounded">
			Logo noir
			</button>
			<button onClick={() => setSelected(logos.logotransparent)} className="bg-[#B41C25] hover:bg-[#8F161E] text-white font-bold py-2 px-4 rounded">
			Logo transparent
			</button>
			<button onClick={() => setSelected(logos.logoarch)} className="bg-[#B41C25] hover:bg-[#8F161E] text-white font-bold py-2 px-4 rounded">
			Logo différent
			</button>

		</div>
		</div>
	);
}

function Resource(props) {
	return (
		<a href={props.href} target="_blank" class="resource">
			<h2>{props.title}</h2>
			<p>{props.description}</p>
		</a>
	);
}
